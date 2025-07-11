
import { UserProvider } from "@/app/context/UserContext"; // ✅ correct
export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserProvider>
      {/* You can also wrap in <div> with className if needed */}
      {children}
      </UserProvider>
    </>
  );
}
