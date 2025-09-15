import React from 'react'
import { Form } from 'react-bootstrap'

export default function ErrorSpan({ error }) {
    if (!error) return null
    return (
        <Form.Text className="error-message">
            {error}
        </Form.Text>
    )
}
