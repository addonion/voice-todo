import { useAuthActions } from '@convex-dev/auth/react'
import { useForm } from '@tanstack/react-form'
import { useConvexAuth } from 'convex/react'
import { Button, Form, Input, Section, YStack } from 'tamagui'

export const LoginForm = () => {
	const { signIn } = useAuthActions()
	const { isAuthenticated } = useConvexAuth()

	console.log('isAuthenticated', isAuthenticated)

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		onSubmit: async ({ value }) => {
			signIn('password', {
				email: value.email,
				password: value.password,
				flow: 'signIn',
			})
		},
	})

	return (
		<Section className="w-100 mx-auto">
			<Form onSubmit={form.handleSubmit}>
				<YStack gap="$3">
					<form.Field
						name="email"
						children={(field) => (
							<Input
								componentName="email"
								placeholder="Email"
								size="$3"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChangeText={field.handleChange}
							/>
						)}
					/>

					<form.Field
						name="password"
						children={(field) => (
							<Input
								componentName="password"
								secureTextEntry
								placeholder="Password"
								size="$3"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChangeText={field.handleChange}
							/>
						)}
					/>

					<Form.Trigger asChild>
						<Button theme="blue" size="$3">
							Login
						</Button>
					</Form.Trigger>
				</YStack>
			</Form>
		</Section>
	)
}
