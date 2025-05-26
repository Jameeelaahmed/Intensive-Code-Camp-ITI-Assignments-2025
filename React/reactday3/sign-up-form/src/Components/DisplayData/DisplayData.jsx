import classes from './DisplayData.module.css'
function DisplayData({ data }) {
    if (!data) return <p>No data submitted yet.</p>;

    return (
        <div className={classes.displayDataContainer}>
            <h3>Submitted User Info</h3>
            <p><strong>First Name:</strong> {data.firstName}</p>
            <p><strong>Last Name:</strong> {data.lastName}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Gender:</strong> {data.acquisition.join(', ')}</p>
        </div>
    );
}

export default DisplayData;
