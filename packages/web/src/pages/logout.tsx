import { useAuthActions } from '@convex-dev/auth/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useTransition } from 'react'

export const Route = createFileRoute('/logout')({
	component: RouteComponent,
})

function RouteComponent() {
	const { signOut } = useAuthActions()
	const navigate = useNavigate()
	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		startTransition(async () => {
			await signOut()
			navigate({ to: '/' })
		})
	}, [navigate, signOut])

	if (isPending) {
		return <div>Выходим из системы</div>
	}

	return <div>Перенаправляем на главную</div>
}
