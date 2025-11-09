import { useAuthActions } from '@convex-dev/auth/react'
import { useConvexAuth } from 'convex/react'
import { useState } from 'react'
import { Button, Sheet, Spinner, Text, XStack } from 'tamagui'
import { LoginForm } from '@/features/user'

export function RightMenu() {
	const [position, setPosition] = useState(0)
	const [isOpen, setIsOpen] = useState(false)

	const { signOut } = useAuthActions()
	const { isLoading, isAuthenticated } = useConvexAuth()

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	const handleSignOut = () => {
		signOut()
	}

	if (isAuthenticated) {
		return (
			<XStack position="absolute" top="$4" right="$4" zIndex={1000}>
				<Button onPress={handleSignOut} size="$4">
					<Text>Выход</Text>
				</Button>
			</XStack>
		)
	}

	return (
		<>
			<XStack position="absolute" top="$4" right="$4" zIndex={1000}>
				{isLoading ? (
					<Button onPress={toggleMenu} circular size="$4">
						<Spinner size="small" color="$green10" />
					</Button>
				) : (
					<Button onPress={toggleMenu} circular size="$4">
						<Text>☰</Text>
					</Button>
				)}
			</XStack>

			<Sheet
				forceRemoveScrollEnabled={isOpen}
				modal
				open={isOpen}
				onOpenChange={toggleMenu}
				snapPoints={[85, 50, 25]}
				snapPointsMode="percent"
				dismissOnSnapToBottom
				position={position}
				onPositionChange={setPosition}
				zIndex={100_000}
				animation="medium"
			>
				<Sheet.Overlay
					animation="lazy"
					backgroundColor="$shadow6"
					enterStyle={{ opacity: 0 }}
					exitStyle={{ opacity: 0 }}
				/>
				<Sheet.Handle />
				<Sheet.Frame
					padding="$4"
					justifyContent="center"
					alignItems="center"
					gap="$5"
				>
					<LoginForm />
				</Sheet.Frame>
			</Sheet>
		</>
	)
}
