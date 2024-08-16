package com.example.employee_management.service;
import com.example.employee_management.model.Employee;
import com.example.employee_management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
	@Autowired
	private EmployeeRepository employeeRepo; 
	
	public List<Employee>getAllEmployee(){
		return employeeRepo.findAll();
	}
	
	public Optional<Employee>getEmployeeById(Long id){
		return employeeRepo.findById(id);
	}
	public Employee saveEmployee(Employee employee) {
		return employeeRepo.save(employee);
	}
	public Employee updateEmployee(Employee employee) {
		return employeeRepo.save(employee);
	}
	public void deleteEmployee(Long id) {
		employeeRepo.deleteById(id);
	}
	
}






