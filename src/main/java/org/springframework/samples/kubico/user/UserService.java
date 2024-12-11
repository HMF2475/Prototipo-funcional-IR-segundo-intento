package org.springframework.samples.kubico.user;



import jakarta.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.kubico.exceptions.AccessDeniedException;
import org.springframework.samples.kubico.exceptions.ResourceNotFoundException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

	private UserRepository userRepository;
	private final PasswordEncoder encoder;


	@Autowired
	public UserService(UserRepository userRepository, PasswordEncoder encoder) {
		this.userRepository = userRepository;
;

		this.encoder = encoder;
	}

	@Transactional
	public User saveUser(User user) throws DataAccessException {
		userRepository.save(user);
		return user;
	}

	@Transactional(readOnly = true)
	public User findUser(String username) {
		return userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
	}

	@Transactional(readOnly = true)
	public User findUser(Integer id) {
		return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
	}



	@Transactional(readOnly = true)
	public User findCurrentUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth == null)
			throw new ResourceNotFoundException("Nobody authenticated!");
		else
			return userRepository.findByUsername(auth.getName())
					.orElseThrow(() -> new ResourceNotFoundException("User", "Username", auth.getName()));
	}

	public Boolean existsUser(String username) {
		return userRepository.existsByUsername(username);
	}

	@Transactional(readOnly = true)
	public Iterable<User> findAll() {
		return userRepository.findAll();
	}

	public Iterable<User> findAllByAuthority(String auth) {
		return userRepository.findAllByAuthority(auth);
	}

	@Transactional
	public User updateUser(@Valid User user, Integer idToUpdate) {
		User toUpdate = findUser(idToUpdate);
		BeanUtils.copyProperties(user, toUpdate, "id");
		userRepository.save(toUpdate);

		return toUpdate;
	}

	@Transactional
	public void deleteUser(Integer id) {
		User toDelete = findUser(id);
		this.userRepository.delete(toDelete);
	}

	@Transactional(rollbackFor = {AccessDeniedException.class})
	public User updateCurrentUser(@Valid User user){
		User currentUser = findCurrentUser();
		if(currentUser == null) {
            throw new AccessDeniedException("Tu usuario no ha sido encontrado");
        }
		
        if(!existsUser(user.getUsername()) || (existsUser(user.getUsername()) && (user.getUsername().equals(currentUser.getUsername())))){
            currentUser.setUsername(user.getUsername());
            if(!(user.getPassword()==null)) {
                currentUser.setPassword(encoder.encode(user.getPassword()));
            }
            saveUser(currentUser);
            return currentUser;
        }else{
            throw new AccessDeniedException("Ese nombre está en uso");
        } 
	}



}
