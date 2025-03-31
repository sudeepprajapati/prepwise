'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import { getCurrentUser, signOut } from '@/lib/actions/auth.action'

interface User {
    id: string
    name: string
    email: string
}

const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getCurrentUser()
            setUser(userData)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowLogout(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLogout = async () => {
        try {
            await signOut()
            setUser(null)
            router.push('/sign-in')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <nav className='flex justify-between items-center'>
            <Link href='/' className='flex items-center gap-2'>
                <Image src='/logo.svg' alt='Logo' width={38} height={32} className='w-10 h-auto' />
                <h2 className='text-primary-100'>PrepWise</h2>
            </Link>

            {user && (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowLogout(!showLogout)}
                        className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-semibold"
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </button>

                    {showLogout && (
                        <div className="absolute right-0 mt-2 w-48 bg-dark-200 rounded-lg shadow-lg py-2 border">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-dark-300"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar