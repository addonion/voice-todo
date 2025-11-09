import { useAuthActions } from '@convex-dev/auth/react'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { useConvexAuth } from 'convex/react'
import { useTransition } from 'react'
import { Button, Form, Input, Section, Spinner, YStack } from 'tamagui'

export const LoginForm = () => {
	const { signIn } = useAuthActions()
	const { isLoading } = useConvexAuth()
	const navigate = useNavigate()
	const [isPending, startTransition] = useTransition()

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		onSubmit: ({ value }) =>
			startTransition(async () => {
				await signIn('password', {
					email: value.email,
					password: value.password,
					flow: 'signIn',
				})
				navigate({ to: '/' })
			}),
	})

	if (isLoading) {
		return <Spinner size="small" color="$green10" />
	}

	return (
		<Section className="w-100 mx-auto">
			<Form onSubmit={form.handleSubmit}>
				<YStack gap="$3">
					<form.Field
						name="email"
						children={(field) => (
							<Input
								autoComplete="email"
								componentName="email"
								placeholder="Email"
								size="$3"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChangeText={field.handleChange}
								disabled={isPending}
							/>
						)}
					/>

					<form.Field
						name="password"
						children={(field) => (
							<Input
								autoComplete="password"
								componentName="password"
								secureTextEntry
								placeholder="Password"
								size="$3"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChangeText={field.handleChange}
								disabled={isPending}
							/>
						)}
					/>

					<Form.Trigger asChild>
						<Button theme="blue" size="$3" disabled={isPending}>
							Login
						</Button>
					</Form.Trigger>
				</YStack>
			</Form>
		</Section>
	)
}
