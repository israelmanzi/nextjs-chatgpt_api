import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState({ text: '' });
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (search) {
        setIsLoading(true);

        const res = await fetch(`/api/openai`, {
          body: JSON.stringify({
            topic: search,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });

        const data = await res.json();

        setData(data);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [search]);

  return (
    <div>
      <Head>
        <title>GPT-3 App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          <a>Blog writer Generator</a>
        </h1>

        <p>Built with Next.js & GPT-3-API</p>

        <div>
          <div>
            <h3>Enter Topic:</h3>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="button" onClick={() => setSearch(query)}>
              Generate
            </button>

            {isLoading ? (
              <div>Loading ...</div>
            ) : (
              <div>
                {data.topic && (
                  <div>
                    <h4>Blog Details</h4>
                    <h4>Topic: {data.topic}</h4>
                  </div>
                )}
                <div>
                  <span>{data.text}</span>
                </div>
                {/* <div>
                  <h4>Author: {data.model}</h4>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
