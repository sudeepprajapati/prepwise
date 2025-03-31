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
    const [showPopup, setShowPopup] = useState(false)
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
                setShowPopup(false)
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
                        onClick={() => setShowPopup(!showPopup)}
                        className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center  font-semibold cursor-pointer"
                    >
                        {user?.name.charAt(0).toUpperCase()}
                    </button>

                    {showPopup && (
                        <div className="absolute right-0 mt-2 w-54 bg-gray-800 bg-blur-2xl rounded-xl shadow-lg py-3 border border-gray-700">
                            <p className='w-full text-left px-4 text-sm text-gray-300 lowercase'>{user?.name}</p>
                            <div className='border-b border-gray-600 my-2' />
                            <div className='flex flex-col ' >
                                <Link href='/about' className='nav-links '>About</Link>
                                <Link href='/interview' className='nav-links '>New Interview</Link>
                                <button
                                    onClick={handleLogout}
                                    className="nav-links text-red-500 "
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar