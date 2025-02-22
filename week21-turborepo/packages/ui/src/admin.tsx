/* type Props = { customElement: ReactNode }

const Component = ({ customElement }: Props) => <div>{customElement}</div>

<Component customElement={<div>hello</div>} />
*/


export default function Admin({appName, className, children}: 
    {appName: string; className?: string,children?: React.ReactNode,customElements?: React.ReactNode}) {


    return ( 
        <div className={className}>
        <h1>Admin Page {appName}</h1>
        <span>-&gt;</span>
        {children}
        </div>
    );
}