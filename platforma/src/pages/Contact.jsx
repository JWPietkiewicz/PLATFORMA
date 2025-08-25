import { useState } from 'react';
import { Stack } from '@fluentui/react';
import { Field, Input, Textarea, Button } from '@fluentui/react-components';
import PageLayout from '../components/PageLayout';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted', formData);
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <PageLayout title="Contact">
      <form onSubmit={handleSubmit}>
        <Stack tokens={{ childrenGap: 20 }}>
          <Field label="Name" required>
            <Input value={formData.name} onChange={handleChange('name')} required />
          </Field>
          <Field label="Email" required>
            <Input type="email" value={formData.email} onChange={handleChange('email')} required />
          </Field>
          <Field label="Message" required>
            <Textarea value={formData.message} onChange={handleChange('message')} required />
          </Field>
          <Button type="submit" appearance="primary">
            Send
          </Button>
        </Stack>
      </form>
    </PageLayout>
  );
}

