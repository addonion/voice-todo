import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/features/user'

export const Route = createFileRoute('/login')({
	head: () => ({
		meta: [
			{
				title: 'Login page',
			},
		],
	}),
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="pb-32">
				<LoginForm />
			</div>
		</div>
	)
}
