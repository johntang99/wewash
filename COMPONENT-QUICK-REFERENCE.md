# 🎨 UI Component Quick Reference

Quick copy-paste examples for all 16 components.

---

## 1. Button

```tsx
import { Button } from '@/components/ui';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>
```

---

## 2. Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui';

<Card variant="default" hover>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your content here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

## 3. Badge

```tsx
import { Badge } from '@/components/ui';

<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

---

## 4. Input

```tsx
import { Input } from '@/components/ui';
import { Mail } from 'lucide-react';

<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  icon={<Mail size={20} />}
  helperText="We'll never share your email"
  error="This field is required"
/>
```

---

## 5. Textarea

```tsx
import { Textarea } from '@/components/ui';

<Textarea
  label="Message"
  placeholder="Your message..."
  rows={4}
  helperText="Maximum 500 characters"
/>
```

---

## 6. Select

```tsx
import { Select } from '@/components/ui';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

<Select
  label="Choose an option"
  options={options}
  placeholder="Select..."
/>
```

---

## 7. Checkbox & Radio

```tsx
import { Checkbox, Radio } from '@/components/ui';

// Checkbox
<Checkbox label="I agree to terms" />

// Radio
<Radio name="plan" label="Basic Plan" value="basic" />
<Radio name="plan" label="Pro Plan" value="pro" />
```

---

## 8. Modal

```tsx
import { Modal, ModalFooter, Button } from '@/components/ui';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Modal Title"
  description="Optional description"
  size="md"
>
  <p>Modal content goes here</p>
  
  <ModalFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button onClick={() => setOpen(false)}>Confirm</Button>
  </ModalFooter>
</Modal>
```

---

## 9. Accordion

```tsx
import { Accordion } from '@/components/ui';

const items = [
  {
    id: '1',
    title: 'Question 1?',
    content: 'Answer to question 1...',
  },
  {
    id: '2',
    title: 'Question 2?',
    content: 'Answer to question 2...',
  },
];

<Accordion 
  items={items} 
  defaultOpen="1"
  allowMultiple={false}
/>
```

---

## 10. Tabs

```tsx
import { Tabs } from '@/components/ui';

const tabs = [
  { 
    id: 'tab1', 
    label: 'Services', 
    content: <div>Services content</div> 
  },
  { 
    id: 'tab2', 
    label: 'Pricing', 
    content: <div>Pricing content</div> 
  },
];

<Tabs tabs={tabs} variant="default" />
<Tabs tabs={tabs} variant="pills" />
<Tabs tabs={tabs} variant="underline" />
```

---

## 11. Carousel

```tsx
import { Carousel } from '@/components/ui';

<Carousel 
  autoPlay 
  interval={3000}
  showDots
  showArrows
>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>
```

---

## 12. Toast

```tsx
import { useToast, Button } from '@/components/ui';

const { showToast, ToastContainer } = useToast();

<Button onClick={() => showToast({ 
  message: 'Success!', 
  type: 'success',
  duration: 5000
})}>
  Show Toast
</Button>

{/* Add at the end of your component */}
<ToastContainer />
```

---

## 13. Loading

```tsx
import { 
  LoadingSpinner, 
  Skeleton, 
  SkeletonCard, 
  SkeletonText,
  LoadingPage
} from '@/components/ui';

// Spinner
<LoadingSpinner size="md" />

// Skeleton
<Skeleton height={40} width={200} />
<SkeletonText lines={3} />
<SkeletonCard />

// Full page
<LoadingPage />
```

---

## 14. Breadcrumb

```tsx
import { Breadcrumb } from '@/components/ui';

const items = [
  { label: 'Services', href: '/services' },
  { label: 'Acupuncture', href: '/services/acupuncture' },
  { label: 'Details' },
];

<Breadcrumb 
  items={items} 
  showHome
  homeHref="/"
/>
```

---

## 15. Pagination

```tsx
import { Pagination } from '@/components/ui';
import { useState } from 'react';

const [currentPage, setCurrentPage] = useState(1);

<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
  showFirstLast
  maxVisible={7}
/>
```

---

## 16. Icon (Lucide React)

```tsx
import { Heart, Star, Mail, Phone } from 'lucide-react';

<Heart size={24} className="text-red-500" />
<Star size={24} className="text-amber-500" />
<Mail size={24} />
<Phone size={20} />

// Available sizes: 16, 20, 24, 32, 48 or any number
```

---

## 🎨 Combining Components

### Card with Form

```tsx
<Card>
  <CardHeader>
    <CardTitle>Contact Form</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <Input label="Name" />
      <Input label="Email" type="email" />
      <Textarea label="Message" />
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="primary" fullWidth>Submit</Button>
  </CardFooter>
</Card>
```

### Modal with Form

```tsx
<Modal open={open} onClose={() => setOpen(false)} title="Book Appointment">
  <div className="space-y-4">
    <Input label="Your Name" />
    <Input label="Phone Number" type="tel" />
    <Select label="Service" options={serviceOptions} />
  </div>
  
  <ModalFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button>Book Now</Button>
  </ModalFooter>
</Modal>
```

### Loading State Example

```tsx
const [loading, setLoading] = useState(true);

{loading ? (
  <SkeletonCard />
) : (
  <Card>
    {/* Your content */}
  </Card>
)}
```

---

## 💡 Pro Tips

1. **Always import from `/components/ui`:**
   ```tsx
   import { Button, Card } from '@/components/ui';
   ```

2. **Combine with Tailwind:**
   ```tsx
   <Button className="mt-4 mb-2">Custom Spacing</Button>
   ```

3. **Use theme colors:**
   ```tsx
   <div className="bg-primary text-white">Themed</div>
   ```

4. **Responsive design:**
   ```tsx
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
   ```

5. **State management:**
   ```tsx
   const [value, setValue] = useState('');
   <Input value={value} onChange={(e) => setValue(e.target.value)} />
   ```

---

**Preview All Components:** http://localhost:3000/en/components-preview

**Need Help?** Check `PHASE-2-COMPLETE.md` for detailed documentation.
