import { createFileRoute, Link } from '@tanstack/react-router'
import { useConvexAuth, useMutation } from 'convex/react'
import { api } from 'shared'

export const Route = createFileRoute('/')({
	component: App,
})

function App() {
	const addTask = useMutation(api.tasks.addTask)
	const { isAuthenticated } = useConvexAuth()
	console.log('isAuthenticated', isAuthenticated)

	const handleAddTask = async () => {
		await addTask({
			name: '123',
			quantity: 0,
		})
	}

	return (
		<div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
			<section className="relative py-20 px-6 text-center overflow-hidden text-white">
				<Link to="/login">Логин</Link>
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
