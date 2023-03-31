export default async function fetchData(api, setResult, setError) {
    try {
        setError(null);
        const response = await fetch(api);
        if (!response.ok) throw new Error(response.status);
        setResult(await response.json());
    } catch (err) {
        setError(err);
    }
}