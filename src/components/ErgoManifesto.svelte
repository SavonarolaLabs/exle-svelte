<script>
	import { is_dark } from '../stores/ui';
	import ErgoRippleEffectDark from './ErgoRippleEffectDark.svelte';
	import ErgoRippleEffectLight from './ErgoRippleEffectLight.svelte';
</script>

<div
	class="flex w-full items-start gap-8 overflow-hidden rounded-2xl border border-light-neutral text-left dark:border-dark-neutral"
>
	<div style="width:324px;height:324px;">
		{#if $is_dark}
			<ErgoRippleEffectDark />
		{:else}
			<ErgoRippleEffectLight />
		{/if}
	</div>
	<div class="hs-full relative flex flex-col justify-center" style="height:324px;">
		<div class="relative z-10">
			<div>
				<h3 class=" mb-6 w-40 text-3xl font-bold uppercase">the ergo manifesto</h3>
				<div class="flex gap-2">
					<!-- style="width:26px;height:26px" -->
					<div>
						<svg
							width="26"
							height="26"
							viewBox="0 0 26 26"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0 14.3696V2.49082L11.8671 2.48828C11.8714 2.48828 11.8755 2.49005 11.8786 2.49319C11.8816 2.49633 11.8833 2.50059 11.8833 2.50504C11.8823 7.096 11.8821 11.7091 11.8828 16.3445C11.8828 18.7423 10.6935 20.9452 8.70746 22.2864C7.75954 22.9262 6.69314 23.3135 5.50824 23.4482C5.23199 23.4794 4.89701 23.4943 4.50328 23.4929C3.6637 23.4895 2.88065 23.4894 2.15414 23.4924C2.14848 23.4924 2.14306 23.4902 2.13906 23.4862C2.13506 23.4822 2.13281 23.4768 2.13281 23.4711V18.4341C2.13281 18.4283 2.13511 18.4228 2.13921 18.4187C2.1433 18.4146 2.14886 18.4123 2.15465 18.4123C3.02504 18.4136 3.89729 18.4131 4.77141 18.4107C5.70781 18.4082 6.51574 17.7465 6.74121 16.8553C6.79267 16.6522 6.81518 16.3284 6.80875 15.8839C6.80164 15.3933 6.80096 14.9075 6.80672 14.4264C6.80679 14.4192 6.80542 14.412 6.80269 14.4053C6.79996 14.3986 6.79594 14.3925 6.79084 14.3873C6.78574 14.3822 6.77967 14.3781 6.77298 14.3753C6.76629 14.3725 6.75912 14.3711 6.75188 14.3711L0 14.3696Z"
								fill="#4E54E6"
							/>
							<path
								d="M26 2.48879V16.5979C25.8487 20.1561 23.175 23.0562 19.6249 23.4487C19.3483 23.4796 19.0103 23.4941 18.6108 23.4924C17.7716 23.4894 16.9916 23.4892 16.2708 23.4919C16.2681 23.4919 16.2654 23.4914 16.2629 23.4904C16.2603 23.4893 16.258 23.4879 16.2561 23.486C16.2542 23.4841 16.2526 23.4818 16.2516 23.4794C16.2505 23.4769 16.25 23.4743 16.25 23.4716V18.4438C16.25 18.4228 16.2605 18.4123 16.2815 18.4123C17.3056 18.4153 18.178 18.4141 18.8988 18.4087C19.3673 18.405 19.7893 18.2501 20.1647 17.9441C20.6668 17.5351 20.919 16.9829 20.9214 16.2876C20.9231 15.6724 20.9229 15.0504 20.9209 14.4214C20.9207 14.408 20.9154 14.3952 20.906 14.3858C20.8965 14.3764 20.8838 14.3711 20.8706 14.3711H14.1426C14.1358 14.3711 14.1294 14.3684 14.1246 14.3637C14.1199 14.3589 14.1172 14.3524 14.1172 14.3457V2.54922C14.1172 2.53306 14.1236 2.51756 14.135 2.50613C14.1465 2.4947 14.162 2.48828 14.1781 2.48828L26 2.48879Z"
								fill="#4E54E6"
							/>
						</svg>
					</div>
					<div>
						<p class=" pt-2" style="padding-right:80px;">
							In the eyes of the original broad community vision, the tools of a cryptocurrency
							should allow people to do economic activity whatever the business size, geographic
							location, or interest rates set by big players.
						</p>
					</div>
				</div>
			</div>
		</div>
		<svg
			width="235"
			height="324"
			viewBox="0 0 235 324"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="absolute right-0 top-0"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M176.177 157.372L69.6514 275.711H239V328H0V275.711L106.526 157.372L0 45.9132V-5H239V45.9132H72.3828L176.177 157.372Z"
				fill={$is_dark ? '#1F2131' : '#EBECFF'}
			/>
		</svg>
	</div>
</div>
