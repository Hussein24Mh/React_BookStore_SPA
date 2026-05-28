import { useQueryClient, useMutation } from "@tanstack/react-query";

import { toggleThemeService } from "../services";

export function useToggleThemeMutation() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: toggleThemeService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["theme"] })
		}
	});
}
