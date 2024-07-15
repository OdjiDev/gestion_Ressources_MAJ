package com.odji.spring_back_end.controller;

import com.odji.spring_back_end.dto.UserDto;
import com.odji.spring_back_end.model.Categorie;
import com.odji.spring_back_end.model.User;
import com.odji.spring_back_end.repository.UserRepository;
import com.odji.spring_back_end.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api")
@CrossOrigin(origins="http://localhost:4200/")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;


    @PostMapping ("/login")
    public ResponseEntity<?> loginUser(@RequestBody User usersData){
        System.out.println(usersData);
        User users=userRepository.findByUserId(usersData.getUserId());
        if(users.getPassword().equals(usersData.getPassword())) { if(users.getUser_role().equals(usersData.getUser_role()) )
//
            return ResponseEntity.ok(users);}
        return (ResponseEntity<?>)ResponseEntity.internalServerError();
    }
    // create USERS
//    @PostMapping("users")
//    public ResponseEntity<UsersDto> createUsers(@RequestBody UsersDto usersDto) {
//        Users users = usersService.dtoToUsers(usersDto);
//        Users savedUsers = usersRepository.save(users);
//        return ResponseEntity.ok(usersService.usersToDto(savedUsers));
//    }

}
    // create USERS
//    @PostMapping("userss")
//    public ResponseEntity<UsersDto> createUsers(@RequestBody UsersDto usersDto) {
//        Users users = userService.dtoToUsers(usersDto);
//        Users savedUsers = userRepository.save(users);
//        return ResponseEntity.ok(userservice.usersToDto(savedUsers));
//    }




    //private UsersService
//////
//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody User usersData) {
//        System.out.println(usersData);
//        User user = userRepository.findByUserId(usersData.getUserId());
//        if (user.getPassword().equals(usersData.getPassword())) {
//            return ResponseEntity.ok(user);
//            //
////    }
//        }
//        return (ResponseEntity<?>) ResponseEntity.internalServerError();
//    }
//}
//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody UserDto userDto) {
//        try {
//            User user = userRepository.findByUserId(userDto.getUserId());
//            if (user != null && (userDto.getPassword().equals(user.getPassword()))){
//             return ResponseEntity.ok(userDto);
//
//            } else {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error logging in");
//        }
//    }
//




