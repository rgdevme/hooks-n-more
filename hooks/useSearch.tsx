import { useState } from 'react'

type apiRequest<T> = (term: string) => Promise<T> | T

const useSearch = <T,>(callback: apiRequest<T>) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [results, setResults] = useState<T>()

	const search = async (term: string) => {
		setLoading(true)
		try {
			const res = await callback(term)
			setResults(res)
			setError('')
		} catch (err) {
			setError(err as string)
		}
		setLoading(false)
	}

	return { search, results, error, loading }
}

export default useSearch
