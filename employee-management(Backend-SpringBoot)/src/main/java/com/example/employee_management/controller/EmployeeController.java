package com.example.employee_management.controller;

import com.example.employee_management.model.Employee;
import com.example.employee_management.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;
	
	@GetMapping
	
	public List<Employee> getAllEmployee(){
		return employeeService.getAllEmployee();
	}
	
	@GetMapping("/{id}")
	
	public ResponseEntity<Employee> getEmployeeByID(@PathVariable Long id){
		return employeeService.getEmployeeById(id).map(ResponseEntity :: ok).orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping
	
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeService.saveEmployee(employee);
	}
	
	@PutMapping("/{id}")
	
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
		return employeeService.getEmployeeById(id)
				.map(employee->{
					employee.setName(employeeDetails.getName());
					employee.setRole(employeeDetails.getRole());
					employee.setSalary(employeeDetails.getSalary());
					return ResponseEntity.ok(employeeService.updateEmployee(employee));
				})
				.orElse(ResponseEntity.notFound().build());
	}
	
	/*@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable Long id){
		return employeeService.getEmployeeById(id)
				.map(employee ->{
					employeeService.deleteEmployee(id);
					return ResponseEntity.noContent().build();
				})
				.orElse(ResponseEntity.notFound().build());
	}*/
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
	    return employeeService.getEmployeeById(id)
	            .map(employee -> {
	                employeeService.deleteEmployee(id);
	                return ResponseEntity.noContent().build();
	            })
	            .orElse(ResponseEntity.notFound().build());
	}
}














