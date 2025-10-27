import { useAuthActions } from '@convex-dev/auth/react'
import { createFileRoute } from '@tanstack/react-router'
import { useConvexAuth, useMutation } from 'convex/react'
import { api } from 'shared'

export const Route = createFileRoute('/')({
	component: App,
})

function App() {
	const { signIn } = useAuthActions()
	const { isAuthenticated } = useConvexAuth()
	const addTask = useMutation(api.tasks.addTask)

	const handleAddTask = async () => {
		alert(1)
		await addTask({
			name: '123',
			quantity: 0,
		})
	}

	console.log('isAuthenticated', isAuthenticated)

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<section className="relative py-20 px-6 text-center overflow-hidden">
				<button
					type="button"
					onClick={() =>
						signIn('password', {
							email: 'addonion@gmail.com',
							password: 'j7pQ9TSz',
							flow: 'signIn',
						})
					}
					className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-red-500/50"
				>
					Login
				</button>
				<button
					type="button"
					onClick={handleAddTask}
					rel="noopener noreferrer"
					className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50"
				>
					Test mutation
				</button>
			</section>
		</div>
	)
}
