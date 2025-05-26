import classes from './SignUp.module.css';
import { useActionState } from 'react';
import { isEmail, isNotEmpty, isEqualToOtherValue, hasMinLength } from '../../util/validation';

function createSignUpAction(onFormSubmit) {
    return function SignUpAction(prevState, formData) {
        const firstName = formData.get('fname');
        const lastName = formData.get('lname');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('cPass');
        const acquisition = formData.getAll('acquisition');

        let errors = [];

        if (!isEmail(email)) {
            errors.push('Invalid email');
        }
        if (!hasMinLength(password, 8)) {
            errors.push('Password must be at least 8 characters long');
        }
        if (!isEqualToOtherValue(password, confirmPassword)) {
            errors.push('Passwords do not match');
        }
        if (!isNotEmpty(firstName)) {
            errors.push('First name is required');
        }
        if (!isNotEmpty(lastName)) {
            errors.push('Last name is required');
        }
        if (acquisition.length === 0) {
            errors.push('You must select your gender');
        }

        const enteredValues = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            acquisition
        };

        if (errors.length > 0) {
            return { errors, enteredValues };
        }

        onFormSubmit(enteredValues);

        return { errors: null, enteredValues };
    };
}

function SignUp({ onFormSubmit }) {
    const [formState, formAction] = useActionState(
        createSignUpAction(onFormSubmit),
        { errors: null, enteredValues: null }
    );

    return (
        <div className={classes.signUpContainer}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>
            <form action={formAction} className={classes.form}>
                <div className={classes.inputContainer}>
                    <label htmlFor="fname">First Name</label>
                    <input id='fname' type="text" name='fname' defaultValue={formState.enteredValues?.firstName} />
                </div>
                <div className={classes.inputContainer}>
                    <label htmlFor="lname">Last Name</label>
                    <input id='lname' type="text" name='lname' defaultValue={formState.enteredValues?.lastName} />
                </div>
                <div className={classes.inputContainer}>
                    <label htmlFor="email">Email</label>
                    <input id='email' type="text" name='email' defaultValue={formState.enteredValues?.email} />
                </div>
                <div className={classes.inputContainer}>
                    <label htmlFor="password">Password</label>
                    <input id='password' type="password" name='password' defaultValue={formState.enteredValues?.password} />
                </div>
                <div className={classes.inputContainer}>
                    <label htmlFor="cPass">Confirm Password</label>
                    <input id='cPass' type="password" name='cPass' defaultValue={formState.enteredValues?.confirmPassword} />
                </div>
                <div className={classes.checkboxContainer}>
                    <p>Gender</p>
                    <div className={classes.con}>
                        <div className={classes.acquisition_con}>
                            <input type="radio" id='male' name='acquisition' value="male" defaultChecked={formState.enteredValues?.acquisition?.includes('male')} />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className={classes.acquisition_con}>
                            <input type="radio" id='female' name='acquisition' value="female" defaultChecked={formState.enteredValues?.acquisition?.includes('female')} />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                </div>
                {formState.errors && (
                    <ul className='error'>
                        {formState.errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}
                <button className="button">Sign up</button>
            </form>
        </div>
    );
}

export default SignUp;
