interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export function ModalComp({ isOpen, onClose, children }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* backdrop */}
			<button
				type="button"
				aria-label="Close modal"
				className="absolute inset-0 bg-black/50 cursor-default"
				onClick={onClose}
			/>
			{/* modal content */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}
