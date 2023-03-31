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
// прекрасно что вынесли в отдельный модуль
// но  это не компонент, поэтому ему не место в папке с другими компонентами 
