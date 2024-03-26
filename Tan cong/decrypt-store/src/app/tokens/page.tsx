"use client";
import { TokenType } from "@/lib/models/token";

export default async function Tokens() {
  const tokens = await fetch(`${process.env.URL}/api/tokens`, { cache: 'no-store' }).then((res) => res.json());

	console.log(typeof tokens);
	if(typeof tokens.map !== 'function'){
		console.log(tokens);
		return;
	}

  return (
    <main className="w-screen m-auto flex justify-center">
			<table className="table-auto w-96 text-sm overflow-x-auto">
				<thead className="uppercase">
					<tr>
						<Heading>Email</Heading>
						<Heading>Fullname</Heading>
						<Heading>Access token</Heading>
						<Heading>Refresh token</Heading>
						<Heading>Expire</Heading>
					</tr>
				</thead>
				{tokens.map((token: TokenType) => {
					let expired = token.expires_in ?new Date(token.expires_in*1000) :undefined;

					return(
					<tr className="text-sm">
						<Data>{token.email}</Data>
						<Data>{token.fullName}</Data>
						<Data>{token.access_token}</Data>
						<Data>{token.refresh_token}</Data>
						<Data>{expired && expired.toLocaleString('en-US', {timeZone: 'Asia/Ho_Chi_Minh'})}</Data>
					</tr>
				)})}
			</table>
    </main>
  );
}

interface CellProps extends React.HtmlHTMLAttributes<HTMLTableDataCellElement> {}

function Heading({children}: CellProps){
	return <th className="px-6 py-3">{children}</th>
}

function Data({children}: CellProps){
	return <td className="px-4">{children}</td>
}
