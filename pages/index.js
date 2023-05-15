import TableOfUsers from '../components/TableOfUsers'
import Head from 'next/head';

export default function App() {
    return (
        <>
            <Head>
                <title>Таблица персонажей JSONPlaceholder</title>
            </Head>
            <div className='table-name'>
                <h1>Таблица персонажей JSONPlaceholder</h1>
                <TableOfUsers />
            </div>
        </>
    );
}