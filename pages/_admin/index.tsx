import LayoutAdmin from "@/libs/components/layouts/LayoutAdmin"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Admin = (props: any) => {
    const router = useRouter()
    useEffect(() => {
        router.push("/_admin/users")
    }, [])
}

export default LayoutAdmin(Admin)
