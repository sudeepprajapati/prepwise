import React from 'react'
import Agent from '@/components/Agent'

const page = () => {
    return (
        <>
            <h3>Interview Genration</h3>
            <Agent username="You" userId="user1" type="generate" />
        </>
    )
}

export default page