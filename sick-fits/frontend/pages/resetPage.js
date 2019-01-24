import Reset from '../components/Reset'

const ResetPage = props => (
    <div>
        <p>Reset Your Password with token {props.query.resetToken}</p>
        <Reset resetToken={props.query.resetToken} />
    </div>
);
    
export default ResetPage;