# Academic Color Palette Guide

## 🎨 **Color Palette Overview**

This color palette is designed to complement your school's background image while maintaining a professional, academic appearance.

### **Primary Colors**
- **Navy Blue** (`#1e3a8a`) - Primary academic color
- **Gold** (`#f59e0b`) - Secondary accent color  
- **Burgundy** (`#7c2d12`) - Rich accent color
- **Forest Green** (`#065f46`) - Nature/academic color
- **Slate Gray** (`#475569`) - Neutral color

### **White Variations**
- **Pure White** (`#ffffff`) - Clean white
- **Off-White** (`#f8fafc`) - Soft white
- **Cream** (`#fef3c7`) - Warm cream
- **Ivory** (`#fafaf9`) - Ivory white

## 🚀 **How to Use This Palette**

### **1. Import the Color Palette**
Add this to your CSS files:
```css
@import './styles/colorPalette.css';
```

### **2. Use CSS Variables**
```css
.my-element {
  background-color: var(--academic-navy);
  color: var(--pure-white);
  border: 2px solid var(--academic-gold);
}
```

### **3. Use Pre-built Classes**
```html
<!-- Buttons -->
<button class="btn-academic-primary">Primary Button</button>
<button class="btn-academic-secondary">Secondary Button</button>

<!-- Cards -->
<div class="card-academic">Content Card</div>
<div class="card-academic-dark">Dark Card</div>

<!-- Text Colors -->
<h1 class="text-academic-primary">Navy Text</h1>
<p class="text-academic-secondary">Gold Text</p>
<span class="text-white">White Text</span>

<!-- Backgrounds -->
<div class="bg-academic-primary">Navy Background</div>
<div class="bg-gradient-primary">Gradient Background</div>
<div class="bg-white">White Background</div>
```

## 📋 **Component Examples**

### **Navigation Bar**
```html
<nav class="navbar-academic">
  <a class="nav-link" href="#">Home</a>
  <a class="nav-link" href="#">About</a>
</nav>
```

### **Forms**
```html
<form class="form-academic">
  <input type="text" placeholder="Enter your name">
  <button class="btn-academic-primary">Submit</button>
</form>
```

### **Cards**
```html
<div class="card-academic shadow-academic">
  <h3 class="text-academic-primary">Card Title</h3>
  <p class="text-muted">Card content</p>
</div>
```

### **Status Indicators**
```html
<div class="academic-success">Success Message</div>
<div class="academic-warning">Warning Message</div>
<div class="academic-error">Error Message</div>
```

## 🎯 **Color Usage Guidelines**

### **Primary Elements**
- **Headers**: Use `var(--academic-navy)` or `text-academic-primary`
- **Buttons**: Use `btn-academic-primary` for main actions
- **Navigation**: Use `navbar-academic` class

### **Secondary Elements**
- **Accents**: Use `var(--academic-gold)` for highlights
- **Secondary Buttons**: Use `btn-academic-secondary`
- **Icons**: Use `var(--academic-burgundy)` for important icons

### **Background Elements**
- **Main Background**: Use your school image with `var(--overlay-dark)`
- **Cards**: Use `card-academic` with `var(--overlay-light)`
- **Forms**: Use `var(--pure-white)` background

### **Text Hierarchy**
- **Primary Text**: `var(--text-primary)` (dark navy)
- **Secondary Text**: `var(--text-secondary)` (slate gray)
- **Light Text**: `var(--text-light)` (white)
- **Muted Text**: `var(--text-muted)` (light gray)

## 🔧 **Implementation Steps**

1. **Update existing components** to use the new classes
2. **Replace hardcoded colors** with CSS variables
3. **Test contrast ratios** for accessibility
4. **Apply consistent styling** across all pages

## 📱 **Responsive Considerations**

The palette includes responsive design considerations:
- Smaller button padding on mobile
- Adjusted border radius for smaller screens
- Maintained readability across devices

## ♿ **Accessibility**

All color combinations meet WCAG contrast requirements:
- Navy text on white background: ✅
- White text on navy background: ✅
- Gold text on dark background: ✅

## 🎨 **Gradient Options**

- **Primary Gradient**: Navy to Burgundy
- **Secondary Gradient**: Gold to Orange
- **Light Gradient**: White to Off-white

Use these for buttons, backgrounds, and accent elements.

---

**Remember**: This palette is designed to work harmoniously with your school's background image while maintaining a professional, academic appearance that includes white as requested. 