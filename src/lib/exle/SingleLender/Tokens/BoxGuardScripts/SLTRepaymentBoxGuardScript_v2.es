{
    // ===== Contract Info ===== //
    // Name             : SLT [Single Lender Tokens] Repayment Box Guard Script
    // Description      : A single lender repayment box allows borrowers or other interested parties
    //                    to fund a repayment box that is meant to be returned to the lender who
    //                    lent his funds to the borrower. This box ensures that the funds are returned
    //                    to the lender when the repayment amount is reached.
    // Type             : Guard Script
    // Author           : Kii
    // Last Modified    : Nov 5th 2022
    // Version          : v 2.0
    // Version Updates  : 1. Repayment Box is kept as historical records and is unspendable
    //                    2. Repayment Box distributes funds when there is enough funds to be distributed
    //                    3. Default is handled by other components. The repayment box is always fundable
    //                      as long as it hasn't reached it's funding goal.
    // Status           : Live Testing Phase

    // ===== Contract Hard-Coded Constants ===== //
    // val _MinFee:                     Long
    // val _MaxByteBoxFee:              Long
    // val _SLTServiceBoxNFTId:         Coll[Byte]
    // val _SLTRepaymentTokenId:        Coll[Byte]

    // ===== Contract Conditions ===== //
    // 1. Fund Repayment        - Fund the repayment box when it is still fundable.
    //                            Also processes over funded boxes
    // 2. Distribute Repayment  - When Repayment is fully funded, the box ensures that
    //                            the funds are returned to the lender.
    //
    // ===== Notes ===== //
    // 1. Funded Unspendable - When a repayment is fully funded, it becomes a historical records and is unspendable
    // 2. Defaulting Credit Check - Defaulting affects credit check (to be implemented), not the state of the box

    // ===== Contract Constants ===== //
    // ##### Values ##### //
    val _fundingInfoRegister: Coll[Long]            = SELF.R4[Coll[Long]]
    val _projectDetailRegister: Coll[Coll[Byte]]    = SELF.R5[Coll[Coll[Byte]]]
    val _borrowerRegister: Coll[Byte]               = SELF.R6[Coll[Byte]]
    val _loanTokenId: Coll[Byte]                    = SELF.R7[Coll[Byte]]
    val _lenderRegister: Coll[Byte]                 = SELF.R8[Coll[Byte]]
    val _repaymentDetailsRegister: Coll[Long]       = SELF.R9[Coll[Long]]

    val _interestRate: Long                         = _fundingInfoRegister.get(2)
    val _repaymentAmountGoal: Long                  = _repaymentDetailsRegister.get(1)
    val _totalInterestAmount: Long                  = _repaymentDetailsRegister.get(2)
    val _repaymentHeightGoal: Long                  = _repaymentDetailsRegister.get(3)
    val _totalRepaidAmount: Long                    = _repaymentDetailsRegister.get(4)
    val _percentageDenominator: Long                = 1000L

    val outSLTRepaymentBox: Box                     = OUTPUTS(0)
    // ##### Global Conditions ##### //
    val isRepaymentDetailsReplicated: Boolean       = {
        allOf(Coll(
            outSLTRepaymentBox.R4[Coll[Long]].get       == SELF.R4[Coll[Long]].get,
            outSLTRepaymentBox.R5[Coll[Coll[Byte]]].get == SELF.R5[Coll[Coll[Byte]]].get,
            outSLTRepaymentBox.R6[Coll[Byte]].get       == SELF.R6[Coll[Byte]].get,
            outSLTRepaymentBox.R7[Coll[Byte]].get       == SELF.R7[Coll[Byte]].get,
            outSLTRepaymentBox.R8[Coll[Byte]].get       == SELF.R8[Coll[Byte]].get,
            outSLTRepaymentBox.R9[Coll[Long]].get       == SELF.R9[Coll[Long]].get,
            outSLTRepaymentBox.propositionBytes         == SELF.propositionBytes,
            outSLTRepaymentBox.tokens(0)                == SELF.tokens(0),
            outSLTRepaymentBox.tokens(1)                == SELF.tokens(1)
        ))
    }

    // ====== Conditions ====== //
    // 1. Fund Repayment - Has 2 Inputs: 0. RepaymentBox, 1. FundPaymentBox
    // 2. Distribute Repayment - Has 1 Inputs: 0. RepaymentBox

    val isDistributeRepayment: Boolean      = INPUTS.size == 1
    if (isDistributeRepayment) {
        // ====== Distribute Repayment ===== //
        // Description  : Distribute repayment to lender and protocol owner
        // INPUTS       : 0. SLTRepaymentBox(SELF)
        // OUTPUTS      : 0. OutSLTRepaymentBox, 1. FundsToLenderBox, 2. FundsToProtocolOwnerBox, 3. MiningFee
        // DataInputs   : 0. SLTServiceBox
        // Conditions   : 1. IsRepaymentDetailsReplicated
        //                2. IsRepaidAmountUpdated
        //                3. IsLenderFunded - Checks the output box
        //                4. IsProtocolOwnerFunded - Checks the output box

        val fundsToLenderBox: Box                   = OUTPUTS(1)
        val fundsToProtocolOwnerBox: Box            = OUTPUTS(2)
        val sltServiceBoxAsDataInput: Box           = CONTEXT.dataInputs(0)
        val protocolOwnerAddress: Coll[Byte]        = sltServiceBoxAsDataInput.R7[Coll[Byte]]
        val profitSharingRegister: Coll[Long]       = sltServiceBoxAsDataInput.R8[Coll[Long]]

        val totalRepaymentBoxTokenAmount: Long     =
            if (SELF.tokens.size > 2) {
                // If this does not pass, do 0 + SELF.tokens(1)._2
                SELF.tokens(2)._2
            } else 0L

        // Capital = (Repayment * Interest Rate) / (Denominator)
        // Interest = Repayment - Capital
        // ProfitSharing = Interest * ProfitSharingRate
        val repaymentAmount: Long                   = totalRepaymentBoxTokenAmount
        val interest: Long                          = (repaymentAmount * _interestRate) / (_percentageDenominator)
        val capital: Long                           = repaymentAmount - interest
        val profitSharingAmount: Long               = (interest * profitSharingRegister.get(0)) / _percentageDenominator

        // ##### IsRepaidAmountUpdated ##### //
        val _outTotalRepaidAmount: Long     = outSLTRepaymentBox.R9[Coll[Long]].get(4)

        val isRepaidAmountUpdated: Boolean  = _outTotalRepaidAmount == _totalRepaidAmount + totalRepaymentBoxTokenAmount

        val isRepaymentDetailsReplicatedForDistribution: Boolean       = {
            allOf(Coll(
                outSLTRepaymentBox.R4[Coll[Long]].get       == SELF.R4[Coll[Long]].get,
                outSLTRepaymentBox.R5[Coll[Coll[Byte]]].get == SELF.R5[Coll[Coll[Byte]]].get,
                outSLTRepaymentBox.R6[Coll[Byte]].get       == SELF.R6[Coll[Byte]].get,
                outSLTRepaymentBox.R7[Coll[Byte]].get       == SELF.R7[Coll[Byte]].get,
                outSLTRepaymentBox.R8[Coll[Byte]].get       == SELF.R8[Coll[Byte]].get,
                outSLTRepaymentBox.R9[Coll[Long]].get(0)    == SELF.R9[Coll[Long]].get(0),
                outSLTRepaymentBox.R9[Coll[Long]].get(1)    == SELF.R9[Coll[Long]].get(1),
                outSLTRepaymentBox.R9[Coll[Long]].get(2)    == SELF.R9[Coll[Long]].get(2),
                outSLTRepaymentBox.R9[Coll[Long]].get(3)    == SELF.R9[Coll[Long]].get(3),
                outSLTRepaymentBox.propositionBytes         == SELF.propositionBytes,
                outSLTRepaymentBox.tokens(0)                == SELF.tokens(0),
                outSLTRepaymentBox.tokens(1)                == SELF.tokens(1),
                outSLTRepaymentBox.value                    == _MaxByteBoxFee
            ))
        }

        // ============ 0 Interest Repayment or Impossible Profit Sharing Split =========== //
        // Description  : For this case, Profit sharing box receives 0 token (we still fund with min box)
        //                We only fund lender.
        val _isZeroInterestLoan: Boolean                = _interestRate == 0
        val _isImpossibleProfitSharingSplit: Boolean    =
            ((_totalInterestAmount * profitSharingRegister.get(0)) / _percentageDenominator) < 1

        if (_isZeroInterestLoan || _isImpossibleProfitSharingSplit) {
            // ##### IsLenderFunded ##### //
            // 1. isLoanTokenForLenderBox
            // 2. isLenderAddressForLenderBox
            // 3. isCorrectSplitAmountForLenderBox
            val lenderReceivedToken: (Coll[Byte], Long)         = fundsToLenderBox.tokens(0)

            val isLoanTokenForLenderBox: Boolean                =
                lenderReceivedToken._1 == _loanTokenId.get

            val isLenderAddressForLenderBox: Boolean            =
                fundsToLenderBox.propositionBytes == _lenderRegister.get

            val paymentAmountToLender: Long                     = repaymentAmount
            val isCorrectSplitAmountForLenderBox: Boolean       =
                lenderReceivedToken._2 == paymentAmountToLender

            val isLenderFunded: Boolean                         = allOf(Coll(
                isLoanTokenForLenderBox,
                isLenderAddressForLenderBox,
                isCorrectSplitAmountForLenderBox
            ))

            // Protocol Owner Share
            val isProtocolOwnerAddressForProtocolOwnerBox: Boolean          =
                fundsToProtocolOwnerBox.propositionBytes == protocolOwnerAddress.get

            val isMinBoxAmountForProtocolOwner: Boolean    =
                fundsToProtocolOwnerBox.value == _MinFee

            val isProtocolOwnerFunded: Boolean                  = allOf(Coll(
                isProtocolOwnerAddressForProtocolOwnerBox,
                isMinBoxAmountForProtocolOwner
            ))

            // Zero Interest and Impossible Profit Sharing SigmaProp
            sigmaProp(allOf(Coll(
                isRepaymentDetailsReplicatedForDistribution,
                isRepaidAmountUpdated,
                isLenderFunded,
                isProtocolOwnerFunded
            )))
        } else {
            // ============ Repayment Distribution with Profit Sharing ========== //
            // Description  : We check to see if we are distributing it with profit
            //                sharing available to be distributed
            //              If profit sharing distribution amount is less than 1,
            //              we fail the transaction
            val _isProfitSharingAmountLessThanOne: Boolean    =
                (profitSharingAmount) < 1

            if (_isProfitSharingAmountLessThanOne) {
                sigmaProp(false)
            } else {
                // ##### IsLenderFunded ##### //
                // 1. isLoanTokenForLenderBox
                // 2. isLenderAddressForLenderBox
                // 3. isCorrectSplitAmountForLenderBox
                val lenderReceivedToken: (Coll[Byte], Long)         = fundsToLenderBox.tokens(0)

                val isLoanTokenForLenderBox: Boolean                =
                    lenderReceivedToken._1 == _loanTokenId.get

                val isLenderAddressForLenderBox: Boolean            =
                    fundsToLenderBox.propositionBytes == _lenderRegister.get

                val paymentAmountToLender: Long                     = repaymentAmount - profitSharingAmount
                val isCorrectSplitAmountForLenderBox: Boolean       =
                    lenderReceivedToken._2 == paymentAmountToLender

                val isLenderFunded: Boolean                         = allOf(Coll(
                    isLoanTokenForLenderBox,
                    isLenderAddressForLenderBox,
                    isCorrectSplitAmountForLenderBox
                ))

                // ##### IsProtocolOwnerFunded ##### //
                // 1. isLoanTokenForProtocolOwnerBox
                // 2. isProtocolOwnerAddressForProtocolOwnerBox
                // 3. isCorrectProfitSharingAmountForProtocolOwnerBox
                val protocolOwnerReceivedToken: (Coll[Byte], Long)  = fundsToProtocolOwnerBox.tokens(0)

                val isLoanTokenForProtocolOwnerBox: Boolean                     =
                    protocolOwnerReceivedToken._1 == _loanTokenId.get

                val isProtocolOwnerAddressForProtocolOwnerBox: Boolean          =
                    fundsToProtocolOwnerBox.propositionBytes == protocolOwnerAddress.get

                val isCorrectProfitSharingAmountForProtocolOwnerBox: Boolean    =
                    protocolOwnerReceivedToken._2 == profitSharingAmount

                val isProtocolOwnerFunded: Boolean                  = allOf(Coll(
                    isLoanTokenForProtocolOwnerBox,
                    isProtocolOwnerAddressForProtocolOwnerBox,
                    isCorrectProfitSharingAmountForProtocolOwnerBox
                ))

                // Repayment Distribution Sigma Prop
                sigmaProp(allOf(Coll(
                    isRepaymentDetailsReplicatedForDistribution,
                    isRepaidAmountUpdated,
                    isLenderFunded,
                    isProtocolOwnerFunded
                )))
            }
        }
    } else {
        // ====== Fund Repayment ====== //
        // Description  : Increment funding in SLTRepaymentBox. RepaymentBox when being funded should end
        //                  up with ErgValue of (Parameters.MinFee * 4). This is to ensure distribution is
        //                  possible. If the box already have that amount, we don't bother to add. Else,
        //                  it is mandatory to fund that amount.
        // Scenarios    : 1. OverFunded
        //                2. Fund
        val paymentBox: Box                 = INPUTS(1)

        val totalInputTokenAmount: Long     =
            if (SELF.tokens.size > 2) {
                paymentBox.tokens(0)._2 + SELF.tokens(2)._2
            } else paymentBox.tokens(0)._2

        // ##### Global Fund Conditions ##### //
        // 1. IsEnoughErgsForDistribution
        // 2. IsPaymentBoxHasRightToken
        val isEnoughErgsForDistribution: Boolean            = outSLTRepaymentBox.value >= (_MinFee * 3) + _MaxByteBoxFee
        val isPaymentBoxHasRightToken: Boolean              = true

        val emptyToken: (Coll[Byte], Long)                  = (Coll(1.toByte), 0L)
        val isRepaymentNotFullyFunded: Boolean              =
            if (SELF.tokens.size > 2) {
                SELF.tokens.getOrElse(0, emptyToken)._1 == _SLTRepaymentTokenId &&
                SELF.tokens.getOrElse(2, emptyToken)._1 == _loanTokenId.get &&
                SELF.tokens.getOrElse(2, emptyToken)._2 < (_repaymentAmountGoal - _totalRepaidAmount) &&
                _totalRepaidAmount < _repaymentAmountGoal
            }
            else {
                SELF.tokens.getOrElse(0, emptyToken)._1 == _SLTRepaymentTokenId &&
                _totalRepaidAmount < _repaymentAmountGoal
            }

        if (isRepaymentNotFullyFunded) {

            val isGlobalFundConditions: Boolean                 = allOf(Coll(
                isEnoughErgsForDistribution,
                isPaymentBoxHasRightToken,
                isRepaymentDetailsReplicated,
                isRepaymentNotFullyFunded
            ))

            val totalFundedValueMoreThanRepaymentGoal: Boolean  = totalInputTokenAmount > _repaymentAmountGoal
            val isOverFunded: Boolean                           = totalFundedValueMoreThanRepaymentGoal
            if (isOverFunded) {
                // ====== Overfunded ====== //
                // Description  : Increment funding in SLTRepaymentBox
                // INPUTS       : 0. SLTRepaymentBox(SELF), 1. FundPaymentBox
                // OUTPUTS      : 0. outSLTRepaymentBox, 1. ReturnToFunderBox, 2. MiningFee
                // Conditions   : 1. IsReturnToFunderBox
                //                2. IsRepaymentBoxFundedIsRepaymentGoal

                val returnToFunderBox: Box                          = OUTPUTS(1)
                val isReturnToFunderBox: Boolean                    = allOf(Coll(
                    returnToFunderBox.tokens(0)._2      == totalInputTokenAmount - (_repaymentAmountGoal - _totalRepaidAmount),
                    returnToFunderBox.tokens(0)._1      == _loanTokenId.get
                ))

                val isRepaymentBoxFundedIsRepaymentGoal: Boolean    = allOf(Coll(
                    outSLTRepaymentBox.tokens(2)._2     == _repaymentAmountGoal - _totalRepaidAmount,
                    outSLTRepaymentBox.tokens(2)._1     == _loanTokenId.get
                ))

                // IsOverFunded SigmaProp
                sigmaProp(allOf(Coll(
                    isReturnToFunderBox,
                    isRepaymentBoxFundedIsRepaymentGoal,
                    isGlobalFundConditions
                )))
            } else {
                // ====== Fund ====== //
                // Description  : Increment funding in SLTRepaymentBox.
                //                  This should take into account ->
                //                  1. Funding via tokens
                //                  2. Funding via Erg for box spending
                // INPUTS       : 0. SLTRepaymentBox(SELF), 1. FundPaymentBox
                // OUTPUTS      : 0. outSLTRepaymentBox, 1. MiningFee
                // Conditions   : 1. IsValueTransferred

                val isValueTransferred: Boolean             = allOf(Coll(
                    outSLTRepaymentBox.tokens(2)._2     == totalInputTokenAmount,
                    outSLTRepaymentBox.tokens(2)._1     == _loanTokenId.get
                ))

                // Fund SigmaProp
                sigmaProp(allOf(Coll(
                    isValueTransferred,
                    isGlobalFundConditions
                )))
            }
        } else {
            // Repayment is funded
            sigmaProp(false)
        }
    }
}