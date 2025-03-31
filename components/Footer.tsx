import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <Link href='/' className='flex items-center gap-2'>
                            <Image src='/logo.svg' alt='Logo' width={28} height={22} className='w-10 h-auto' />
                            <h2 className='text-2xl font-bold text-primary-200'>PrepWise</h2>
                        </Link>
                        <p className="text-light-100/80 text-sm">
                            Revolutionizing interview preparation with AI-powered voice assistance. Practice, improve, and succeed in your interviews.
                        </p>
                    </div>

                    <div className="space-y-4 md:mx-auto">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <nav className="flex flex-col space-y-2">
                            <Link href="/" className="text-light-100/80 hover:text-primary-200 text-sm">
                                Home
                            </Link>
                            <Link href="/about" className="text-light-100/80 hover:text-primary-200 text-sm">
                                About
                            </Link>
                        </nav>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Get Started</h3>
                        <Link href="/interview" className="border border-white p-2 rounded-2xl flex-1">
                            Try PrepWise
                        </Link>
                    </div>
                </div>

                <div className="border-t border-light-100/10 mt-8 pt-8">
                    <p className="text-center text-sm text-light-100/60">
                        © {currentYear} PrepWise. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer