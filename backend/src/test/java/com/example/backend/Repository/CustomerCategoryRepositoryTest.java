<<<<<<< HEAD
package com.example.backend.Repository;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Projection.CustomerCategoryProjection;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class CustomerCategoryRepositoryTest {

    @Autowired
    private CustomerCategoryRepository customerCategoryRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testFindCustomerCategoryByActiveAndRegionName() {
        CustomerCategory customerCategory1 = new CustomerCategory();
        entityManager.persist(customerCategory1);

        String search = "search text";
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        PageRequest pageable = PageRequest.of(0, 10);

        Page<CustomerCategoryProjection> result = customerCategoryRepository.findCustomerCategoryByActiveAndRegionName(search, active, pageable);

        assertEquals(10, result.getSize());
    }

    @Test
    public void testFindCustomerCategoryByRegionAndName() {
        CustomerCategory customerCategory1 = new CustomerCategory();
        entityManager.persist(customerCategory1);

        String search = "search text";
        PageRequest pageable = PageRequest.of(0, 10);

        List<Boolean> active = new ArrayList<>();
        active.add(true);
        active.add(false);

        Page<CustomerCategoryProjection> result = customerCategoryRepository.findCustomerCategoryByActiveAndRegionName(search, active,pageable);

        assertEquals(10, result.getSize());
    }
}
=======
//package com.example.backend.Repository;
//
//import com.example.backend.Entity.CustomerCategory;
//import com.example.backend.Projection.CustomerCategoryProjection;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//public class CustomerCategoryRepositoryTest {
//
//    @Autowired
//    private CustomerCategoryRepository customerCategoryRepository;
//
//    @Autowired
//    private TestEntityManager entityManager;
//
//    @Test
//    public void testFindCustomerCategoryByActiveAndRegionName() {
//        CustomerCategory customerCategory1 = new CustomerCategory();
//        entityManager.persist(customerCategory1);
//
//        String search = "search text";
//        Boolean status = true;
//        PageRequest pageable = PageRequest.of(0, 10);
//
//        Page<CustomerCategoryProjection> result = customerCategoryRepository.findCustomerCategoryByActiveAndRegionName(search, status, pageable);
//
//        assertEquals(10, result.getSize());
//    }
//
//    @Test
//    public void testFindCustomerCategoryByRegionAndName() {
//        CustomerCategory customerCategory1 = new CustomerCategory();
//        entityManager.persist(customerCategory1);
//
//        String search = "search text";
//        PageRequest pageable = PageRequest.of(0, 10);
//
//        Page<CustomerCategoryProjection> result = customerCategoryRepository.findCustomerCategoryByActiveAndRegionName(search,, pageable);
//
//        assertEquals(10, result.getSize());
//    }
//}
>>>>>>> 024b48a888cd8b265891f612bb03beb0a08283d9
