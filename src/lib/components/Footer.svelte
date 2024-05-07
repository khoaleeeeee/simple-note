<script>
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink,
		FooterBrand,
		FooterIcon
	} from 'flowbite-svelte';
	import { FacebookSolid, GithubSolid, DiscordSolid, TwitterSolid } from 'flowbite-svelte-icons';
	import Logo from '$lib/components/Logo.svelte';
</script>

<Footer footerType="socialmedia" class="bg-gray-100">
	<div class="md:flex md:justify-between">
		<div class="mb-6 md:mb-0 w-1/6">
			<Logo />
		</div>
		<div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
					Follow us
				</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" target="_blank" href="https://github.com/khoaleeeeee"
						>GitHub</FooterLink
					>
					<FooterLink liClass="mb-4" target="_blank" href="https://discord.com/channels/@khoale4681"
						>Discord</FooterLink
					>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Legal</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="/auth">Privacy Policy</FooterLink>
					<FooterLink liClass="mb-4" href="/auth">Terms & Conditions</FooterLink>
				</FooterLinkGroup>
			</div>
		</div>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterCopyright by="Khoa Le" />
		<div class="flex mt-4 space-x-6 rtl:space-x-reverse sm:justify-center sm:mt-0">
			<FooterIcon target="_blank" href="https://www.facebook.com/">
				<FacebookSolid
					class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
				/>
			</FooterIcon>
			<FooterIcon target="_blank" href="https://discord.com/channels/@khoale4681">
				<DiscordSolid
					class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
				/>
			</FooterIcon>
			<FooterIcon target="_blank" href="https://github.com/khoaleeeeee">
				<GithubSolid
					class="w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
				/>
			</FooterIcon>
		</div>
	</div>
</Footer>
