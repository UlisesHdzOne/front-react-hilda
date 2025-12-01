import { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export interface ClassNameProps {
  className?: string;
}

export interface StyleProps {
  style?: React.CSSProperties;
}

export interface OnClickProps {
  onClick?: () => void;
}

export interface DisabledProps {
  disabled?: boolean;
}

export interface LoadingProps {
  loading?: boolean;
}

export interface ErrorProps {
  error?: string;
}

// Props específicas para formularios
export interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  placeholder?: string;
}

export interface InputProps extends FormFieldProps, DisabledProps {
  type?: "text" | "password" | "email" | "tel" | "number";
  value?: string;
  onChange?: (value: string) => void;
}

// Props para componentes de autenticación
export interface AuthFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}
