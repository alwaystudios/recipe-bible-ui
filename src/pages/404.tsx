import React from 'react'
import { StatusPage } from '../components/StatusPage'

export const Http404: React.FC = () => <StatusPage status="not found" statusCode={404} />
