import { ThemeProvider } from "@/components/ui/theme-provider";
import { UserProvider } from "@/app/context/UserContext"; // ✅ correct
export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
      <UserProvider>
      {/* You can also wrap in <div> with className if needed */}
      {children}
      </UserProvider>
    </ThemeProvider>
    </>
  );
}
