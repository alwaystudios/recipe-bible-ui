import React from 'react'
import { StatusPage } from '../components/StatusPage'

export const Http403: React.FC = () => <StatusPage status="not authorized" statusCode={403} />
