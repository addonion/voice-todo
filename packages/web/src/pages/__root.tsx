import { ConvexAuthProvider } from '@convex-dev/auth/react'
import { TamaguiProvider } from '@tamagui/core'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { ConvexReactClient } from 'convex/react'
import { tamaguiConfig } from 'shared'
import baseCss from '../app/base.css?url'

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'TanStack Start Starter',
			},
		],
		links: [
			{
				rel: 'stylesheet',
				href: baseCss,
			},
		],
	}),

	shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	const convexClient = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<TamaguiProvider config={tamaguiConfig}>
					<ConvexAuthProvider client={convexClient}>
						{children}
					</ConvexAuthProvider>
				</TamaguiProvider>
				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	)
}
