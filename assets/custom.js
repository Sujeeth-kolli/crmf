$(document).ready(function () {
    // Initialize the carousel
    $('#investmentCarousel').carousel({
        interval: 1000, // Adjust slide interval in milliseconds (5 seconds)
        pause: "hover"  // Pause the carousel on mouse hover
    });
    // Define the angle of each item in the orbit
    const itemAngles = {
        'orbit-item1': 0,     // Top
        'orbit-item2': 90,    // Left
        'orbit-item3': 180,   // Bottom
        'orbit-item4': 270    // Right
    };

    // Handle the click event on the orbit items
    $('.orbit-item').click(function() {
        // Get the class of the clicked orbit item
        var clickedItemClass = $(this).attr('class').split(' ')[1];

        // Calculate the rotation based on the clicked item
        if(itemAngles[clickedItemClass] == 0 || itemAngles[clickedItemClass] == 180){
            var angleToRotate = -0 + itemAngles[clickedItemClass] - 65;  // Always rotate to left side (90 degrees)
        }
        else{
            var angleToRotate = 180 - itemAngles[clickedItemClass] - 65;  // Always rotate to left side (90 degrees)
        }

        // Rotate the orbit to bring the clicked item to the left side
        // $('#orbit').css('transform', 'rotate(' + angleToRotate + 'deg)');

        // Apply counter-rotation to each orbit item

        // $('.orbit-item img').animate({ opacity: 0 }, 300, function() {
        //     // This function will be called after the first animation completes
        //     $(this).animate({ opacity: 1 }, 100, function() {
        //         // This function will be called after the second animation completes
        //         $(this).css('transform', 'rotate(' + (-angleToRotate) + 'deg)');
        //     });
        // });

        $('#orbit').css('transform', 'rotate(' + angleToRotate + 'deg)'); 

        $('.orbit-item img').animate({ opacity: 0 }, 100, function() {
            // Apply the transform after the opacity is set to 0
            $(this).css('transform', 'rotate(' + (-angleToRotate) + 'deg)');

            // Use setTimeout to ensure the transform is applied before starting the opacity animation
            setTimeout(() => {
                $(this).animate({ opacity: 1 }, 200);
            }, 200); // Delay for 200ms before starting the opacity animation
        });

        // Get the content ID from the clicked orbit item
        var contentId = $(this).data('content');

        // Hide all the left sections
        $('.left-section-uni').removeClass('active');
        $('.orbit-item').removeClass('highlight');

        // Show the corresponding content section
        $('#' + contentId).addClass('active');
        $(this).addClass("highlight");  
    });
});
