import {JwtPayload, verify} from "jsonwebtoken";
import {v4} from "uuid"
import md5 from "md5"

export default function Page() {
    return (
        <p>Unknown credentials...</p>
    );
}

function createMD5Value(submission: string): string {
    return md5(process.env.ACCOUNT_NUMBER?.concat(process.env.ACCOUNT_API_KEY ?? "", submission) ?? "")
}

export async function getServerSideProps({ params }: { params: { jwt: string } }) {
    let jwtPayload = verify(params.jwt, process.env.JWT_SECRET ?? "") as JwtPayload;
    let submission_number = v4();
    let payload = {
        Header: {
            MessageType: "Request",
            SubmissionNumber: submission_number,
            Authentication: {
                AccNumber: process.env.ACCOUNT_NUMBER,
                MD5Value: createMD5Value(submission_number),
                ApplicationID: process.env.APPLICATION_ID
            }
        },
        Body: {
            LandingPage: {
                Dashboard: "true"
            },
            ClientID: jwtPayload.client_id
        }
    };

    let r = await fetch("https://api.quickfile.co.uk/1_2/Client/LogIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({payload}),
    })
    let data = await r.json();
    return {
        redirect: {
            destination: data["Client_LogIn"]["Body"]["RedirectUrl"],
            permanent: false,
        },
        props: {},
    };
}
