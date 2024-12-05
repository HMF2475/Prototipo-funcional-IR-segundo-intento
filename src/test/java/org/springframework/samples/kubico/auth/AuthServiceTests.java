package org.springframework.samples.kubico.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Collection;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.samples.kubico.auth.AuthService;
import org.springframework.samples.kubico.auth.payload.request.SignupRequest;
import org.springframework.samples.kubico.clinic.Clinic;
import org.springframework.samples.kubico.clinic.ClinicService;
import org.springframework.samples.kubico.clinic.PricingPlan;
import org.springframework.samples.kubico.clinicowner.ClinicOwner;
import org.springframework.samples.kubico.clinicowner.ClinicOwnerService;
import org.springframework.samples.kubico.owner.Owner;
import org.springframework.samples.kubico.owner.OwnerService;
import org.springframework.samples.kubico.user.AuthoritiesService;
import org.springframework.samples.kubico.user.User;
import org.springframework.samples.kubico.user.UserService;
import org.springframework.samples.kubico.vet.Vet;
import org.springframework.samples.kubico.vet.VetService;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
public class AuthServiceTests {

	@Autowired
	protected AuthService authService;
	@Autowired
	protected UserService userService;
	@Autowired
	protected VetService vetService;
	@Autowired
	protected OwnerService ownerService;
	@Autowired
	protected ClinicService clinicService;
	@Autowired
	protected ClinicOwnerService clinicOwnerService;
	@Autowired
	protected AuthoritiesService authoritiesService;

	@Test
	@Transactional
	public void shouldCreateAdminUser() {
		SignupRequest request = createRequest("ADMIN", "admin2");
		int userFirstCount = ((Collection<User>) this.userService.findAll()).size();
		this.authService.createUser(request);
		int userLastCount = ((Collection<User>) this.userService.findAll()).size();
		assertEquals(userFirstCount + 1, userLastCount);
	}
	
	@Test
	@Transactional
	public void shouldCreateVetUser() {
		SignupRequest request = createRequest("VET", "vettest");
		int userFirstCount = ((Collection<User>) this.userService.findAll()).size();
		int vetFirstCount = ((Collection<Vet>) this.vetService.findAll()).size();
		this.authService.createUser(request);
		int userLastCount = ((Collection<User>) this.userService.findAll()).size();
		int vetLastCount = ((Collection<Vet>) this.vetService.findAll()).size();
		assertEquals(userFirstCount + 1, userLastCount);
		assertEquals(vetFirstCount + 1, vetLastCount);
	}
	
	@Test
	@Transactional
	public void shouldCreateOwnerUser() {
		SignupRequest request = createRequest("OWNER", "ownertest");
		int userFirstCount = ((Collection<User>) this.userService.findAll()).size();
		int ownerFirstCount = ((Collection<Owner>) this.ownerService.findAll()).size();
		this.authService.createUser(request);
		int userLastCount = ((Collection<User>) this.userService.findAll()).size();
		int ownerLastCount = ((Collection<Owner>) this.ownerService.findAll()).size();
		assertEquals(userFirstCount + 1, userLastCount);
		assertEquals(ownerFirstCount + 1, ownerLastCount);
	}

	private SignupRequest createRequest(String auth, String username) {
		SignupRequest request = new SignupRequest();
		request.setDireccion("prueba");
		request.setAuthority(auth);
		request.setFirstName("prueba");
		request.setLastName("prueba");
		request.setPassword("prueba");
		request.setTelefono("123123123");
		request.setUsername(username);

		if(auth == "OWNER" || auth == "VET") {
			User clinicOwnerUser = new User();
			clinicOwnerUser.setUsername("clinicOwnerTest");
			clinicOwnerUser.setPassword("clinicOwnerTest");
			clinicOwnerUser.setAuthority(authoritiesService.findByAuthority("CLINIC_OWNER"));
			userService.saveUser(clinicOwnerUser);
			ClinicOwner clinicOwner = new ClinicOwner();
			Clinic clinic = new Clinic();
			clinicOwner.setFirstName("Test Name");
			clinicOwner.setLastName("Test Surname");
			clinicOwner.setUser(clinicOwnerUser);
			clinicOwnerService.saveClinicOwner(clinicOwner);
			clinic.setName("Clinic Test");
			clinic.setAddress("Test Address");
			clinic.setPlan(PricingPlan.PLATINUM);
			clinic.setTelephone("123456789");
			clinic.setClinicOwner(clinicOwner);
			clinicService.save(clinic);
		}

		return request;
	}

}