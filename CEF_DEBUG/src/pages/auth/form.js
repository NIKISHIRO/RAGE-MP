import React from 'react';
import {Form, Button} from 'react-bootstrap';
import router from '~s/router';
import store from '~s/form';
import {observer} from 'mobx-react';

@observer
export default class extends React.Component {
    render() {
        let formData = store.formData;
        let inputs = [];

        for (let key in formData) {
            if (formData[key].for === router.route || formData[key].for === null) {
                inputs.push(
                    <Form.Group controlId={formData[key].label} key={formData[key].label}>
                        <Form.Label>{formData[key].label}</Form.Label>
                        
                        <Form.Control 
                            type={formData[key].text} 
                            placeholder={formData[key].placeholder}
                            value={formData[key].value}
                            onChange={(e) => store.setValue(key, e.target.value)} />
                        
                        <Form.Text className="text-danger">
                            {formData[key].valid || 
                             formData[key].valid === null ? '' : formData[key].textError}
                        </Form.Text>
                    </Form.Group>
                );
            }
        }
        return(
            <div className='formWrap'>
                <Form>
                    {inputs}
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}