import TableOfUsers from '../components/TableOfUsers'
import Head from 'next/head';

export default function App() {
    return (
        <>
            <Head>
                <title>The table of JSONPlaceholder`s users</title>
            </Head>
            <div className='table-name'>
                <h1>The table of JSONPlaceholder`s users</h1>
                <TableOfUsers />
            </div>
        </>
    );
}