import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  multiple?: boolean;
}

export function CheckboxGroup({ label, options, selectedValues, onChange, multiple = false }: CheckboxGroupProps) {
  const handleToggle = (value: string) => {
    if (multiple) {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((v) => v !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    } else {
      onChange([value]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => handleToggle(option.value)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                {isSelected && <Check size={16} color="#FFFFFF" strokeWidth={3} />}
              </View>
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  optionsContainer: {
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  optionSelected: {
    borderColor: '#0066CC',
    backgroundColor: '#EFF6FF',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  optionText: {
    fontSize: 15,
    color: '#4B5563',
    flex: 1,
  },
  optionTextSelected: {
    color: '#0066CC',
    fontWeight: '500',
  },
});
