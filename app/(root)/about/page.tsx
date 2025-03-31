import React from 'react'
import Link from 'next/link'

const AboutPage = () => {
    return (
        <div className="flex flex-col gap-16 max-w-4xl mx-auto">
            {/* Hero Section */}
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-6">About Prepwise</h1>
                <p className="text-xl">
                    Revolutionizing interview preparation with AI-powered voice assistance
                </p>
            </section>

            {/* Platform Overview */}
            <section className="space-y-6">
                <h2 className="text-3xl font-semibold">Our Platform</h2>
                <p className="text-lg">
                    Prepwise combines cutting-edge AI technology with practical interview preparation tools to help job seekers excel in their interviews. Through our innovative voice-assisted mock interviews, candidates can practice and improve their interview skills in a realistic environment.
                </p>
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-2 gap-8">
                <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-3">AI Voice Assistants</h3>
                    <p>Practice with intelligent AI interviewers that provide real-time feedback and natural conversations.</p>
                </div>
                <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-3">Personalized Questions</h3>
                    <p>Get role-specific questions tailored to your experience level and technical stack.</p>
                </div>
                <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-3">Instant Feedback</h3>
                    <p>Receive detailed feedback on your responses, helping you improve with each practice session.</p>
                </div>
                <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
                    <p>Monitor your improvement over time with detailed interview history and analytics.</p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="text-center">
                <h2 className="text-3xl font-semibold mb-6">Get Started Today</h2>
                <p className="text-lg mb-8">
                    Ready to transform your interview preparation experience?
                </p>
                <Link href="/interview" className="btn-primary">
                    Try Prepwise
                </Link>
            </section>
        </div>
    )
}

export default AboutPage