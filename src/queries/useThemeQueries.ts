import { useQuery } from "@tanstack/react-query";

import { loadThemeService } from "../services";

export function useCurrentThemeQuery() {
	return useQuery({
		queryKey: ["theme"],
		queryFn: loadThemeService,
	});
}
