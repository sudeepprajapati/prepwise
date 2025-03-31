import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const isUserAuthenticated = await isAuthenticated();

    if (!isUserAuthenticated) redirect('/sign-in')
    return (
        <div className='root-layout'>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default RootLayout