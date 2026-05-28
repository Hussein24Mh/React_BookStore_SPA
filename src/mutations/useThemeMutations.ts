import { useMutation } from "@tanstack/react-query";

import { toggleThemeService } from "../services/ThemeServices";

export function useToggleThemeMutation() {
	return useMutation({
		mutationFn: toggleThemeService,
	});
}