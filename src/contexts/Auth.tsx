import { createContext, useContext, useState } from "react";

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}


// --- CONTEXT ---
const AuthContext = createContext<AuthContextType | null>(null);



// --- PROVIDER ---
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    function login(userData: User) {
        setUser(userData);
    }

    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// --- Custom Hook ---
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}