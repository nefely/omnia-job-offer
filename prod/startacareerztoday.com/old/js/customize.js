$(document).ready(function(){

if (angle == "pt") {
	if (prepop == 1) {
		document.querySelector("#intro-slot").insertAdjacentHTML("beforeend", 
			`<section class="intro">
				<div class="container bg radius-md">
					<div class="intro-content col-12 col-lg-12">
						<h1 class="title">Work as a <br /> <span>Product Tester</span></h1>
						<div class="container-bullets">
							<div class="bullets">
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Starting at $15 per hour</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>No experience required</p>
									</div>	
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Flexible schedule</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Weekly salary</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="container-form">
						<div class="question question--1">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>ZIP</p>
									</div>
									<div class="field-content">
										<input type="text" name="zip" placeholder="In what zipcode?">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 21C10.7369 19.9226 9.56619 18.7415 8.5 17.469C6.9 15.558 5 12.712 5 9.99999C4.99858 7.16754 6.70425 4.61338 9.32107 3.52939C11.9379 2.44539 14.9501 3.04523 16.952 5.04899C18.2685 6.3596 19.0059 8.14238 19 9.99999C19 12.712 17.1 15.558 15.5 17.469C14.4338 18.7415 13.2631 19.9226 12 21ZM12 4.99999C9.23995 5.0033 7.00331 7.23994 7 9.99999C7 11.166 7.527 13.185 10.035 16.186C10.6531 16.924 11.309 17.6297 12 18.3C12.691 17.6304 13.3472 16.9259 13.966 16.189C16.473 13.184 17 11.165 17 9.99999C16.9967 7.23994 14.7601 5.0033 12 4.99999ZM12 13C10.3431 13 9 11.6568 9 9.99999C9 8.34313 10.3431 6.99999 12 6.99999C13.6569 6.99999 15 8.34313 15 9.99999C15 10.7956 14.6839 11.5587 14.1213 12.1213C13.5587 12.6839 12.7957 13 12 13Z"/>
										</svg>
									</div>
								</div>
								<div class="submit">
									<button class="btn disabled">Apply Now</button>
								</div>
							</div>
						</div>
						<div class="question question--2">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>First Name</p>
									</div>
									<div class="field-content">
										<input type="text" name="firstname" placeholder="John">
									</div>
								</div>
								<div class="field">
									<div class="field-title">
										<p>Last Name</p>
									</div>
									<div class="field-content">
										<input type="text" name="lastname" placeholder="Doe">
									</div>
								</div>
								<div class="field">
									<div class="field-title">
										<p>Email</p>
									</div>
									<div class="field-content">
										<input type="text" name="email" placeholder="example@gmail.com">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z"/>
										</svg>
									</div>
								</div>
								<div class="submit">
									<button class="btn disabled">Continue</button>
								</div>
							</div>
						</div>
						<div class="question question--3">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>Phone</p>
									</div>
									<div class="field-content">
										<input type="text" name="phone" placeholder="(000) 000-0000">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8.74214 8.68189C7.66901 9.59373 7.27576 11.2567 8.20237 12.5908C9.06948 13.8392 10.1618 14.9313 11.4099 15.798C12.7441 16.7244 14.407 16.3311 15.3187 15.2579L15.3289 15.2626C16.4934 15.8021 17.7304 16.1718 19 16.3603V19L18.9989 19L18.9961 19C11.0215 19.0113 4.99148 12.9111 5.00001 5.00359V5H7.63937L7.63954 5.00117C7.828 6.27065 8.19761 7.50654 8.73714 8.67108L8.74214 8.68189ZM18.9989 21H20C20.5523 21 21 20.5523 21 20V15.4977C21 15.0021 20.637 14.5813 20.1468 14.5086L19.2926 14.3818C18.2123 14.2215 17.1605 13.9069 16.1695 13.4478L15.4166 13.0991C14.9804 12.897 14.462 13.034 14.1826 13.4253L13.8418 13.9024C13.5431 14.3206 12.9728 14.4484 12.5506 14.1552C11.4984 13.4245 10.5761 12.5024 9.84502 11.4499C9.55181 11.0277 9.67955 10.4574 10.0978 10.1587L10.5748 9.81807C10.9661 9.53861 11.1031 9.02021 10.901 8.5839L10.5518 7.83033C10.0927 6.8394 9.77823 5.78774 9.61786 4.70749L9.49104 3.85316C9.41827 3.36296 8.99745 3 8.50188 3H4.00001C3.44773 3 3.00001 3.44772 3.00001 4V5.00143C2.99029 14.0079 9.91023 21.0129 18.9989 21Z"/>
										</svg>
									</div>
								</div>
								<div class="field field--rules">
									<p>By clicking "Submit", I agree to email marketing, <a href="terms-of-use/" target="_blank">Terms & Conditions</a> including mandatory arbitration, <a href="privacy-policy/" target="_blank">Privacy Policy</a> and site visit recordation by TrustedForm and Jornaya</p>
								</div>
								<div class="submit">
									<a class="btn disabled offer-link" href="https://track.${domain}/track.php?lp=1">Submit</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>`
		);
	} else {
		prepop = 0
		document.querySelector("#intro-slot").insertAdjacentHTML("beforeend", 
			`<section class="intro">
				<div class="container bg radius-md">
					<div class="intro-content col-12 col-lg-12">
						<h1 class="title">Work as a <br /> <span>Product Tester</span></h1>
						<div class="container-bullets">
							<div class="bullets">
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Starting at $15 per hour</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>No experience required</p>
									</div>	
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Flexible schedule</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Weekly salary</p>
									</div>
								</div>
							</div>
						</div>
						<a href="https://track.${domain}/track.php?lp=1&to_offer=6" class="intro-link btn btn-lg ll">Apply Now</a>
					</div>
				</div>
			</section>`
		);
	}
}
else if (angle == "pr-g") {
	if (prepop == 1) {
		document.querySelector("#intro-slot").insertAdjacentHTML("beforeend", 
			`<section class="intro">
				<div class="container bg radius-md">
					<div class="intro-content col-12 col-lg-12">
						<h1 class="title">Work as a <br /> <span>Product Reviewer</span></h1>
						<div class="container-bullets">
							<div class="bullets">
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Starting at $15 per hour</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>No experience required</p>
									</div>	
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Flexible schedule</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Weekly salary</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="container-form">
						<div class="question question--1">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>ZIP</p>
									</div>
									<div class="field-content">
										<input type="text" name="zip" placeholder="In what zipcode?">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 21C10.7369 19.9226 9.56619 18.7415 8.5 17.469C6.9 15.558 5 12.712 5 9.99999C4.99858 7.16754 6.70425 4.61338 9.32107 3.52939C11.9379 2.44539 14.9501 3.04523 16.952 5.04899C18.2685 6.3596 19.0059 8.14238 19 9.99999C19 12.712 17.1 15.558 15.5 17.469C14.4338 18.7415 13.2631 19.9226 12 21ZM12 4.99999C9.23995 5.0033 7.00331 7.23994 7 9.99999C7 11.166 7.527 13.185 10.035 16.186C10.6531 16.924 11.309 17.6297 12 18.3C12.691 17.6304 13.3472 16.9259 13.966 16.189C16.473 13.184 17 11.165 17 9.99999C16.9967 7.23994 14.7601 5.0033 12 4.99999ZM12 13C10.3431 13 9 11.6568 9 9.99999C9 8.34313 10.3431 6.99999 12 6.99999C13.6569 6.99999 15 8.34313 15 9.99999C15 10.7956 14.6839 11.5587 14.1213 12.1213C13.5587 12.6839 12.7957 13 12 13Z"/>
										</svg>
									</div>
								</div>
								<div class="submit">
									<button class="btn disabled">Apply Now</button>
								</div>
							</div>
						</div>
						<div class="question question--2">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>First Name</p>
									</div>
									<div class="field-content">
										<input type="text" name="firstname" placeholder="John">
									</div>
								</div>
								<div class="field">
									<div class="field-title">
										<p>Last Name</p>
									</div>
									<div class="field-content">
										<input type="text" name="lastname" placeholder="Doe">
									</div>
								</div>
								<div class="field">
									<div class="field-title">
										<p>Email</p>
									</div>
									<div class="field-content">
										<input type="text" name="email" placeholder="example@gmail.com">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z"/>
										</svg>
									</div>
								</div>
								<div class="submit">
									<button class="btn disabled">Continue</button>
								</div>
							</div>
						</div>
						<div class="question question--3">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>Phone</p>
									</div>
									<div class="field-content">
										<input type="text" name="phone" placeholder="(000) 000-0000">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8.74214 8.68189C7.66901 9.59373 7.27576 11.2567 8.20237 12.5908C9.06948 13.8392 10.1618 14.9313 11.4099 15.798C12.7441 16.7244 14.407 16.3311 15.3187 15.2579L15.3289 15.2626C16.4934 15.8021 17.7304 16.1718 19 16.3603V19L18.9989 19L18.9961 19C11.0215 19.0113 4.99148 12.9111 5.00001 5.00359V5H7.63937L7.63954 5.00117C7.828 6.27065 8.19761 7.50654 8.73714 8.67108L8.74214 8.68189ZM18.9989 21H20C20.5523 21 21 20.5523 21 20V15.4977C21 15.0021 20.637 14.5813 20.1468 14.5086L19.2926 14.3818C18.2123 14.2215 17.1605 13.9069 16.1695 13.4478L15.4166 13.0991C14.9804 12.897 14.462 13.034 14.1826 13.4253L13.8418 13.9024C13.5431 14.3206 12.9728 14.4484 12.5506 14.1552C11.4984 13.4245 10.5761 12.5024 9.84502 11.4499C9.55181 11.0277 9.67955 10.4574 10.0978 10.1587L10.5748 9.81807C10.9661 9.53861 11.1031 9.02021 10.901 8.5839L10.5518 7.83033C10.0927 6.8394 9.77823 5.78774 9.61786 4.70749L9.49104 3.85316C9.41827 3.36296 8.99745 3 8.50188 3H4.00001C3.44773 3 3.00001 3.44772 3.00001 4V5.00143C2.99029 14.0079 9.91023 21.0129 18.9989 21Z"/>
										</svg>
									</div>
								</div>
								<div class="field field--rules">
									<p>By clicking "Submit", I agree to email marketing, <a href="terms-of-use/" target="_blank">Terms & Conditions</a> including mandatory arbitration, <a href="privacy-policy/" target="_blank">Privacy Policy</a> and site visit recordation by TrustedForm and Jornaya</p>
								</div>
								<div class="submit">
									<a class="btn disabled offer-link" href="https://track.${domain}/track.php?lp=1">Submit</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>`
		);
	} else {
		prepop = 0
		document.querySelector("#intro-slot").insertAdjacentHTML("beforeend", 
			`<section class="intro">
				<div class="container bg radius-md">
					<div class="intro-content col-12 col-lg-12">
						<h1 class="title">Work as a <br /> <span>Product Reviewer</span></h1>
						<div class="container-bullets">
							<div class="bullets">
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Starting at $15 per hour</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>No experience required</p>
									</div>	
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Flexible schedule</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Weekly salary</p>
									</div>
								</div>
							</div>
						</div>
						<a href="https://track.${domain}/track.php?lp=1&to_offer=6" class="intro-link btn btn-lg ll">Apply Now</a>
					</div>
				</div>
			</section>`
		);
	}
}
else if (angle == "pr-ha") {
	if (prepop == 1) {
		document.querySelector("#intro-slot").insertAdjacentHTML("beforeend", 
			`<section class="intro">
				<div class="container bg radius-md">
					<div class="intro-content col-12 col-lg-12">
						<h1 class="title">Work as a <br /> <span>Product Reviewer</span></h1>
						<div class="container-bullets">
							<div class="bullets">
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Starting at $15 per hour</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>No experience required</p>
									</div>	
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Flexible schedule</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Weekly salary</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="container-form">
						<div class="question question--1">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>ZIP</p>
									</div>
									<div class="field-content">
										<input type="text" name="zip" placeholder="In what zipcode?">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 21C10.7369 19.9226 9.56619 18.7415 8.5 17.469C6.9 15.558 5 12.712 5 9.99999C4.99858 7.16754 6.70425 4.61338 9.32107 3.52939C11.9379 2.44539 14.9501 3.04523 16.952 5.04899C18.2685 6.3596 19.0059 8.14238 19 9.99999C19 12.712 17.1 15.558 15.5 17.469C14.4338 18.7415 13.2631 19.9226 12 21ZM12 4.99999C9.23995 5.0033 7.00331 7.23994 7 9.99999C7 11.166 7.527 13.185 10.035 16.186C10.6531 16.924 11.309 17.6297 12 18.3C12.691 17.6304 13.3472 16.9259 13.966 16.189C16.473 13.184 17 11.165 17 9.99999C16.9967 7.23994 14.7601 5.0033 12 4.99999ZM12 13C10.3431 13 9 11.6568 9 9.99999C9 8.34313 10.3431 6.99999 12 6.99999C13.6569 6.99999 15 8.34313 15 9.99999C15 10.7956 14.6839 11.5587 14.1213 12.1213C13.5587 12.6839 12.7957 13 12 13Z"/>
										</svg>
									</div>
								</div>
								<div class="submit">
									<button class="btn disabled">Apply Now</button>
								</div>
							</div>
						</div>
						<div class="question question--2">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>First Name</p>
									</div>
									<div class="field-content">
										<input type="text" name="firstname" placeholder="John">
									</div>
								</div>
								<div class="field">
									<div class="field-title">
										<p>Last Name</p>
									</div>
									<div class="field-content">
										<input type="text" name="lastname" placeholder="Doe">
									</div>
								</div>
								<div class="field">
									<div class="field-title">
										<p>Email</p>
									</div>
									<div class="field-content">
										<input type="text" name="email" placeholder="example@gmail.com">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z"/>
										</svg>
									</div>
								</div>
								<div class="submit">
									<button class="btn disabled">Continue</button>
								</div>
							</div>
						</div>
						<div class="question question--3">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>Phone</p>
									</div>
									<div class="field-content">
										<input type="text" name="phone" placeholder="(000) 000-0000">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8.74214 8.68189C7.66901 9.59373 7.27576 11.2567 8.20237 12.5908C9.06948 13.8392 10.1618 14.9313 11.4099 15.798C12.7441 16.7244 14.407 16.3311 15.3187 15.2579L15.3289 15.2626C16.4934 15.8021 17.7304 16.1718 19 16.3603V19L18.9989 19L18.9961 19C11.0215 19.0113 4.99148 12.9111 5.00001 5.00359V5H7.63937L7.63954 5.00117C7.828 6.27065 8.19761 7.50654 8.73714 8.67108L8.74214 8.68189ZM18.9989 21H20C20.5523 21 21 20.5523 21 20V15.4977C21 15.0021 20.637 14.5813 20.1468 14.5086L19.2926 14.3818C18.2123 14.2215 17.1605 13.9069 16.1695 13.4478L15.4166 13.0991C14.9804 12.897 14.462 13.034 14.1826 13.4253L13.8418 13.9024C13.5431 14.3206 12.9728 14.4484 12.5506 14.1552C11.4984 13.4245 10.5761 12.5024 9.84502 11.4499C9.55181 11.0277 9.67955 10.4574 10.0978 10.1587L10.5748 9.81807C10.9661 9.53861 11.1031 9.02021 10.901 8.5839L10.5518 7.83033C10.0927 6.8394 9.77823 5.78774 9.61786 4.70749L9.49104 3.85316C9.41827 3.36296 8.99745 3 8.50188 3H4.00001C3.44773 3 3.00001 3.44772 3.00001 4V5.00143C2.99029 14.0079 9.91023 21.0129 18.9989 21Z"/>
										</svg>
									</div>
								</div>
								<div class="field field--rules">
									<p>By clicking "Submit", I agree to email marketing, <a href="terms-of-use/" target="_blank">Terms & Conditions</a> including mandatory arbitration, <a href="privacy-policy/" target="_blank">Privacy Policy</a> and site visit recordation by TrustedForm and Jornaya</p>
								</div>
								<div class="submit">
									<a class="btn disabled offer-link" href="https://track.${domain}/track.php?lp=1">Submit</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>`
		);
	} else {
		prepop = 0
		document.querySelector("#intro-slot").insertAdjacentHTML("beforeend", 
			`<section class="intro">
				<div class="container bg radius-md">
					<div class="intro-content col-12 col-lg-12">
						<h1 class="title">Work as a <br /> <span>Product Reviewer</span></h1>
						<div class="container-bullets">
							<div class="bullets">
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Starting at $15 per hour</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>No experience required</p>
									</div>	
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Flexible schedule</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Weekly salary</p>
									</div>
								</div>
							</div>
						</div>
						<a href="https://track.${domain}/track.php?lp=1&to_offer=6" class="intro-link btn btn-lg ll">Apply Now</a>
					</div>
				</div>
			</section>`
		);
	}
}
else if (angle == "gt") {
	if (prepop == 1) {
		document.querySelector("#intro-slot").insertAdjacentHTML("beforeend", 
			`<section class="intro">
				<div class="container bg radius-md">
					<div class="intro-content col-12 col-lg-12">
						<h1 class="title">Work as a<br /> <span>Game Tester</span></h1>
						<div class="container-bullets">
							<div class="bullets">
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Starting at $15 per hour</p>
									</div>	
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>No experience required</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Flexible schedule</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Weekly salary</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="container-form">
						<div class="question question--1">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>ZIP</p>
									</div>
									<div class="field-content">
										<input type="text" name="zip" placeholder="In what zipcode?">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 21C10.7369 19.9226 9.56619 18.7415 8.5 17.469C6.9 15.558 5 12.712 5 9.99999C4.99858 7.16754 6.70425 4.61338 9.32107 3.52939C11.9379 2.44539 14.9501 3.04523 16.952 5.04899C18.2685 6.3596 19.0059 8.14238 19 9.99999C19 12.712 17.1 15.558 15.5 17.469C14.4338 18.7415 13.2631 19.9226 12 21ZM12 4.99999C9.23995 5.0033 7.00331 7.23994 7 9.99999C7 11.166 7.527 13.185 10.035 16.186C10.6531 16.924 11.309 17.6297 12 18.3C12.691 17.6304 13.3472 16.9259 13.966 16.189C16.473 13.184 17 11.165 17 9.99999C16.9967 7.23994 14.7601 5.0033 12 4.99999ZM12 13C10.3431 13 9 11.6568 9 9.99999C9 8.34313 10.3431 6.99999 12 6.99999C13.6569 6.99999 15 8.34313 15 9.99999C15 10.7956 14.6839 11.5587 14.1213 12.1213C13.5587 12.6839 12.7957 13 12 13Z"/>
										</svg>
									</div>
								</div>
								<div class="submit">
									<button class="btn disabled">Apply Now</button>
								</div>
							</div>
						</div>
						<div class="question question--2">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>First Name</p>
									</div>
									<div class="field-content">
										<input type="text" name="firstname" placeholder="John">
									</div>
								</div>
								<div class="field">
									<div class="field-title">
										<p>Last Name</p>
									</div>
									<div class="field-content">
										<input type="text" name="lastname" placeholder="Doe">
									</div>
								</div>
								<div class="field">
									<div class="field-title">
										<p>Email</p>
									</div>
									<div class="field-content">
										<input type="text" name="email" placeholder="example@gmail.com">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z"/>
										</svg>
									</div>
								</div>
								<div class="submit">
									<button class="btn disabled">Continue</button>
								</div>
							</div>
						</div>
						<div class="question question--3">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>Phone</p>
									</div>
									<div class="field-content">
										<input type="text" name="phone" placeholder="(000) 000-0000">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8.74214 8.68189C7.66901 9.59373 7.27576 11.2567 8.20237 12.5908C9.06948 13.8392 10.1618 14.9313 11.4099 15.798C12.7441 16.7244 14.407 16.3311 15.3187 15.2579L15.3289 15.2626C16.4934 15.8021 17.7304 16.1718 19 16.3603V19L18.9989 19L18.9961 19C11.0215 19.0113 4.99148 12.9111 5.00001 5.00359V5H7.63937L7.63954 5.00117C7.828 6.27065 8.19761 7.50654 8.73714 8.67108L8.74214 8.68189ZM18.9989 21H20C20.5523 21 21 20.5523 21 20V15.4977C21 15.0021 20.637 14.5813 20.1468 14.5086L19.2926 14.3818C18.2123 14.2215 17.1605 13.9069 16.1695 13.4478L15.4166 13.0991C14.9804 12.897 14.462 13.034 14.1826 13.4253L13.8418 13.9024C13.5431 14.3206 12.9728 14.4484 12.5506 14.1552C11.4984 13.4245 10.5761 12.5024 9.84502 11.4499C9.55181 11.0277 9.67955 10.4574 10.0978 10.1587L10.5748 9.81807C10.9661 9.53861 11.1031 9.02021 10.901 8.5839L10.5518 7.83033C10.0927 6.8394 9.77823 5.78774 9.61786 4.70749L9.49104 3.85316C9.41827 3.36296 8.99745 3 8.50188 3H4.00001C3.44773 3 3.00001 3.44772 3.00001 4V5.00143C2.99029 14.0079 9.91023 21.0129 18.9989 21Z"/>
										</svg>
									</div>
								</div>
								<div class="field field--rules">
									<p>By clicking "Submit", I agree to email marketing, <a href="terms-of-use/" target="_blank">Terms & Conditions</a> including mandatory arbitration, <a href="privacy-policy/" target="_blank">Privacy Policy</a> and site visit recordation by TrustedForm and Jornaya</p>
								</div>
								<div class="submit">
									<a class="btn disabled offer-link" href="https://track.${domain}/track.php?lp=1">Submit</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>`
		);
	} else {
		prepop = 0
		document.querySelector("#intro-slot").insertAdjacentHTML("beforeend", 
			`<section class="intro">
				<div class="container bg radius-md">
					<div class="intro-content col-12 col-lg-12">
						<h1 class="title">Work as a<br /> <span>Game Tester</span></h1>
						<div class="container-bullets">
							<div class="bullets">
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Starting at $15 per hour</p>
									</div>	
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>No experience required</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Flexible schedule</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Weekly salary</p>
									</div>
								</div>
							</div>
						</div>
						<a href="https://track.${domain}/track.php?lp=1&to_offer=6" class="intro-link btn btn-lg ll">Apply Now</a>
					</div>
				</div>
			</section>`
		);
	}
}
else {
	angle = "default"
	if (prepop == 1) {
		document.querySelector("#intro-slot").insertAdjacentHTML("beforeend", 
			`<section class="intro">
				<div class="container bg radius-md">
					<div class="intro-content col-12 col-lg-12">
						<h1 class="title">Find <span>Jobs Near <span class="desk-br"><br></span> You <span class="mob-br"><br></span></span> and Build a <span class="desk-br"><br></span> Career</h1>
						<div class="container-bullets">
							<div class="bullets">
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Starting at $15 per hour</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Applicants needed</p>
									</div>	
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Positions available</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="container-form">
						<div class="question question--1">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>ZIP</p>
									</div>
									<div class="field-content">
										<input type="text" name="zip" placeholder="In what zipcode?">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 21C10.7369 19.9226 9.56619 18.7415 8.5 17.469C6.9 15.558 5 12.712 5 9.99999C4.99858 7.16754 6.70425 4.61338 9.32107 3.52939C11.9379 2.44539 14.9501 3.04523 16.952 5.04899C18.2685 6.3596 19.0059 8.14238 19 9.99999C19 12.712 17.1 15.558 15.5 17.469C14.4338 18.7415 13.2631 19.9226 12 21ZM12 4.99999C9.23995 5.0033 7.00331 7.23994 7 9.99999C7 11.166 7.527 13.185 10.035 16.186C10.6531 16.924 11.309 17.6297 12 18.3C12.691 17.6304 13.3472 16.9259 13.966 16.189C16.473 13.184 17 11.165 17 9.99999C16.9967 7.23994 14.7601 5.0033 12 4.99999ZM12 13C10.3431 13 9 11.6568 9 9.99999C9 8.34313 10.3431 6.99999 12 6.99999C13.6569 6.99999 15 8.34313 15 9.99999C15 10.7956 14.6839 11.5587 14.1213 12.1213C13.5587 12.6839 12.7957 13 12 13Z"/>
										</svg>
									</div>
								</div>
								<div class="submit">
									<button class="btn disabled">Find Jobs</button>
								</div>
							</div>
						</div>
						<div class="question question--2">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>First Name</p>
									</div>
									<div class="field-content">
										<input type="text" name="firstname" placeholder="John">
									</div>
								</div>
								<div class="field">
									<div class="field-title">
										<p>Last Name</p>
									</div>
									<div class="field-content">
										<input type="text" name="lastname" placeholder="Doe">
									</div>
								</div>
								<div class="field">
									<div class="field-title">
										<p>Email</p>
									</div>
									<div class="field-content">
										<input type="text" name="email" placeholder="example@gmail.com">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z"/>
										</svg>
									</div>
								</div>
								<div class="submit">
									<button class="btn disabled">Continue</button>
								</div>
							</div>
						</div>
						<div class="question question--3">
							<div class="question-fields">
								<div class="field">
									<div class="field-title">
										<p>Phone</p>
									</div>
									<div class="field-content">
										<input type="text" name="phone" placeholder="(000) 000-0000">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8.74214 8.68189C7.66901 9.59373 7.27576 11.2567 8.20237 12.5908C9.06948 13.8392 10.1618 14.9313 11.4099 15.798C12.7441 16.7244 14.407 16.3311 15.3187 15.2579L15.3289 15.2626C16.4934 15.8021 17.7304 16.1718 19 16.3603V19L18.9989 19L18.9961 19C11.0215 19.0113 4.99148 12.9111 5.00001 5.00359V5H7.63937L7.63954 5.00117C7.828 6.27065 8.19761 7.50654 8.73714 8.67108L8.74214 8.68189ZM18.9989 21H20C20.5523 21 21 20.5523 21 20V15.4977C21 15.0021 20.637 14.5813 20.1468 14.5086L19.2926 14.3818C18.2123 14.2215 17.1605 13.9069 16.1695 13.4478L15.4166 13.0991C14.9804 12.897 14.462 13.034 14.1826 13.4253L13.8418 13.9024C13.5431 14.3206 12.9728 14.4484 12.5506 14.1552C11.4984 13.4245 10.5761 12.5024 9.84502 11.4499C9.55181 11.0277 9.67955 10.4574 10.0978 10.1587L10.5748 9.81807C10.9661 9.53861 11.1031 9.02021 10.901 8.5839L10.5518 7.83033C10.0927 6.8394 9.77823 5.78774 9.61786 4.70749L9.49104 3.85316C9.41827 3.36296 8.99745 3 8.50188 3H4.00001C3.44773 3 3.00001 3.44772 3.00001 4V5.00143C2.99029 14.0079 9.91023 21.0129 18.9989 21Z"/>
										</svg>
									</div>
								</div>
								<div class="field field--rules">
									<p>By clicking "Submit", I agree to email marketing, <a href="terms-of-use/" target="_blank">Terms & Conditions</a> including mandatory arbitration, <a href="privacy-policy/" target="_blank">Privacy Policy</a> and site visit recordation by TrustedForm and Jornaya</p>
								</div>
								<div class="submit">
									<a class="btn disabled offer-link" href="https://track.${domain}/track.php?lp=1">Submit</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>`
		);
	} else {
		prepop = 0
		document.querySelector("#intro-slot").insertAdjacentHTML("beforeend", 
			`<section class="intro">
				<div class="container bg radius-md">
					<div class="intro-content col-12 col-lg-12">
						<h1 class="title">Find <span>Jobs Near <span class="desk-br"><br></span> You <span class="mob-br"><br></span></span> and Build a <span class="desk-br"><br></span> Career</h1>
						<div class="container-bullets">
							<div class="bullets">
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Starting at $15 per hour</p>
									</div>
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Applicants needed</p>
									</div>	
								</div>
								<div class="bullet-item">
									<div class="bullet-item-inner">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.183 8.08125L11.542 15.9027C11.4631 16.0127 11.3592 16.1024 11.2388 16.1642C11.1184 16.2261 10.9849 16.2584 10.8496 16.2584C10.7142 16.2584 10.5808 16.2261 10.4603 16.1642C10.3399 16.1024 10.236 16.0127 10.1571 15.9027L6.81696 11.2741C6.71518 11.1321 6.81696 10.9339 6.99107 10.9339H8.24732C8.52054 10.9339 8.78036 11.0652 8.94107 11.2902L10.8482 13.9366L15.0589 8.09732C15.2196 7.875 15.4768 7.74107 15.7527 7.74107H17.0089C17.183 7.74107 17.2848 7.93929 17.183 8.08125Z" />
										</svg>
										<p>Positions available</p>
									</div>
								</div>
							</div>
						</div>
						<a href="https://track.${domain}/track.php?lp=1&to_offer=1" class="intro-link btn btn-lg ll">Find Jobs</a>
					</div>
				</div>
			</section>`
		);
	}
}

$('.intro').attr("data-angle" , `${angle}`)
$('.intro').attr("data-prepop" , `${prepop}`)

console.log(angle)
console.log(prepop)

$('.preloader').delay(300).fadeOut(300);

})